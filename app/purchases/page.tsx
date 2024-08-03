// pages/purchases.tsx
'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Divider,
  Text,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { DeleteIcon } from '@chakra-ui/icons';

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      invoiceNumber: '',
      vendorName: '',
    },
  });

  const handleAddPurchase = () => {
    setPurchases([...purchases, { date: '', id: '', vendor: '', grams: '', weight: '', pricePerCt: '', amount: '' }]);
  };

  const handleDeletePurchase = (index: number) => {
    setPurchases(purchases.filter((_, i) => i !== index));
  };

  const handleAddInvoice = (data) => {
    setInvoices([
      ...invoices,
      {
        invoiceNumber: data.invoiceNumber,
        vendorName: data.vendorName,
        purchases: [],
      },
    ]);
    reset();
    onClose();
  };

  const handleAddInvoicePurchase = (invoiceIndex: number) => {
    const newInvoices = invoices.slice();
    newInvoices[invoiceIndex].purchases.push({ date: '', id: '', vendor: '', grams: '', weight: '', pricePerCt: '', amount: '' });
    setInvoices(newInvoices);
  };

  const handleDeleteInvoicePurchase = (invoiceIndex: number, purchaseIndex: number) => {
    const newInvoices = invoices.slice();
    newInvoices[invoiceIndex].purchases = newInvoices[invoiceIndex].purchases.filter((_, i) => i !== purchaseIndex);
    setInvoices(newInvoices);
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Diamond Purchases</Text>
      <Button onClick={handleAddPurchase} mb={4} colorScheme="purple">
        Add Purchase
      </Button>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>ID</Th>
            <Th>Vendor</Th>
            <Th>Grams</Th>
            <Th>Weight</Th>
            <Th>Price per ct</Th>
            <Th>Amount</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {purchases.map((purchase, index) => (
            <Tr key={index}>
              <Td><Input value={purchase.date} onChange={(e) => {
                const newPurchases = purchases.slice();
                newPurchases[index].date = e.target.value;
                setPurchases(newPurchases);
              }} /></Td>
              <Td><Input value={purchase.id} onChange={(e) => {
                const newPurchases = purchases.slice();
                newPurchases[index].id = e.target.value;
                setPurchases(newPurchases);
              }} /></Td>
              <Td><Input value={purchase.vendor} onChange={(e) => {
                const newPurchases = purchases.slice();
                newPurchases[index].vendor = e.target.value;
                setPurchases(newPurchases);
              }} /></Td>
              <Td><Input value={purchase.grams} onChange={(e) => {
                const newPurchases = purchases.slice();
                newPurchases[index].grams = e.target.value;
                setPurchases(newPurchases);
              }} /></Td>
              <Td><Input value={purchase.weight} onChange={(e) => {
                const newPurchases = purchases.slice();
                newPurchases[index].weight = e.target.value;
                setPurchases(newPurchases);
              }} /></Td>
              <Td><Input value={purchase.pricePerCt} onChange={(e) => {
                const newPurchases = purchases.slice();
                newPurchases[index].pricePerCt = e.target.value;
                setPurchases(newPurchases);
              }} /></Td>
              <Td><Input value={purchase.amount} onChange={(e) => {
                const newPurchases = purchases.slice();
                newPurchases[index].amount = e.target.value;
                setPurchases(newPurchases);
              }} /></Td>
              <Td>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeletePurchase(index)}
                  colorScheme="red"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Divider my={4} />
      <Text fontSize="lg" fontWeight="bold" mb={4}>Mumbai Diamond</Text>
      <Button onClick={onOpen} mb={4} colorScheme="purple">
        Add Invoice
      </Button>
      {invoices.map((invoice, invoiceIndex) => (
        <Box key={invoiceIndex} border="1px solid black" borderRadius="md" p={4} bg="purple.100" mb={4}>
          <Text mb={2}>Invoice {invoice.invoiceNumber}</Text>
          <Button onClick={() => handleAddInvoicePurchase(invoiceIndex)} mb={2} colorScheme="purple">
            Add Purchase
          </Button>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>ID</Th>
                <Th>Vendor</Th>
                <Th>Grams</Th>
                <Th>Weight</Th>
                <Th>Price per ct</Th>
                <Th>Amount</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoice.purchases.map((purchase, purchaseIndex) => (
                <Tr key={purchaseIndex}>
                  <Td><Input value={purchase.date} onChange={(e) => {
                    const newInvoices = invoices.slice();
                    newInvoices[invoiceIndex].purchases[purchaseIndex].date = e.target.value;
                    setInvoices(newInvoices);
                  }} /></Td>
                  <Td><Input value={purchase.id} onChange={(e) => {
                    const newInvoices = invoices.slice();
                    newInvoices[invoiceIndex].purchases[purchaseIndex].id = e.target.value;
                    setInvoices(newInvoices);
                  }} /></Td>
                  <Td><Input value={purchase.vendor} onChange={(e) => {
                    const newInvoices = invoices.slice();
                    newInvoices[invoiceIndex].purchases[purchaseIndex].vendor = e.target.value;
                    setInvoices(newInvoices);
                  }} /></Td>
                  <Td><Input value={purchase.grams} onChange={(e) => {
                    const newInvoices = invoices.slice();
                    newInvoices[invoiceIndex].purchases[purchaseIndex].grams = e.target.value;
                    setInvoices(newInvoices);
                  }} /></Td>
                  <Td><Input value={purchase.weight} onChange={(e) => {
                    const newInvoices = invoices.slice();
                    newInvoices[invoiceIndex].purchases[purchaseIndex].weight = e.target.value;
                    setInvoices(newInvoices);
                  }} /></Td>
                  <Td><Input value={purchase.pricePerCt} onChange={(e) => {
                    const newInvoices = invoices.slice();
                    newInvoices[invoiceIndex].purchases[purchaseIndex].pricePerCt = e.target.value;
                    setInvoices(newInvoices);
                  }} /></Td>
                  <Td><Input value={purchase.amount} onChange={(e) => {
                    const newInvoices = invoices.slice();
                    newInvoices[invoiceIndex].purchases[purchaseIndex].amount = e.target.value;
                    setInvoices(newInvoices);
                  }} /></Td>
                  <Td>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteInvoicePurchase(invoiceIndex, purchaseIndex)}
                      colorScheme="red"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleAddInvoice)}>
              <VStack spacing={4} align="start">
                <Controller
                  name="invoiceNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Invoice Number"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="vendorName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Vendor Name"
                      {...field}
                    />
                  )}
                />
              </VStack>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PurchasesPage;
