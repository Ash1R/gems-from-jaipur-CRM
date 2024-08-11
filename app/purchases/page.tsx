"use client";
import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function PurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, error, isLoading } = useUser();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      invoiceNumber: "",
      vendorName: "",
    },
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch("/api/invoices");
      const data = await response.json();
      setInvoices(data);
    };

    fetchInvoices();
  }, []);

  const handleAddPurchase = async () => {
    const newPurchase = {
      date: new Date(),
      vendor: "",
      grams: 0,
      weight: 0,
      pricePerCt: 0,
      amount: 0,
    };

    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchase),
      });

      if (!response.ok) {
        throw new Error("Failed to add purchase");
      }

      const savedPurchase = await response.json();
      setPurchases([...purchases, savedPurchase]);
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  };

  const handleDeletePurchase = async (index: number) => {
    const purchaseToDelete = purchases[index];

    try {
      const response = await fetch(`/api/purchases?id=${purchaseToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete purchase");
      }

      setPurchases(purchases.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };

  const handleAddInvoice = async (data: any) => {
    const newInvoice = {
      invoiceNumber: data.invoiceNumber,
      vendorName: data.vendorName,
      purchases: [],
    };

    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      });

      if (!response.ok) {
        throw new Error("Failed to add invoice");
      }

      const savedInvoice = await response.json();
      setInvoices([...invoices, savedInvoice]);
      reset();
      onClose();
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  };

  const handleAddInvoicePurchase = (invoiceIndex: number) => {
    const newInvoices = [...invoices];
    if (!newInvoices[invoiceIndex].purchases) {
      newInvoices[invoiceIndex].purchases = [];
    }
    newInvoices[invoiceIndex].purchases.push({
      date: "",
      vendor: "",
      grams: 0,
      weight: 0,
      pricePerCt: 0,
      amount: 0,
    });
    setInvoices(newInvoices);
  };

  const handleDeleteInvoicePurchase = (
    invoiceIndex: number,
    purchaseIndex: number
  ) => {
    const newInvoices = [...invoices];
    newInvoices[invoiceIndex].purchases = newInvoices[
      invoiceIndex
    ].purchases.filter((_, i) => i !== purchaseIndex);
    setInvoices(newInvoices);
  };
  const UserDiv = () => {
    return (
      user && (
        <div>
          <p>{user.email}</p>
        </div>
      )
    );
  };
  return (
    <Box p={4}>
      <a href="/api/auth/login">Login</a> <br />
      <a href="/api/auth/logout">Logout</a>
      <UserDiv />
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Diamond Purchases
      </Text>
      <Button onClick={handleAddPurchase} mb={4} colorScheme="purple">
        Add Purchase
      </Button>
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
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
              <Td>
                <Input
                  value={purchase.date}
                  onChange={(e) => {
                    const newPurchases = [...purchases];
                    newPurchases[index].date = e.target.value;
                    setPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.vendor}
                  onChange={(e) => {
                    const newPurchases = [...purchases];
                    newPurchases[index].vendor = e.target.value;
                    setPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.grams}
                  onChange={(e) => {
                    const newPurchases = [...purchases];
                    newPurchases[index].grams = e.target.value;
                    setPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.weight}
                  onChange={(e) => {
                    const newPurchases = [...purchases];
                    newPurchases[index].weight = e.target.value;
                    setPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.pricePerCt}
                  onChange={(e) => {
                    const newPurchases = [...purchases];
                    newPurchases[index].pricePerCt = e.target.value;
                    setPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.amount}
                  onChange={(e) => {
                    const newPurchases = [...purchases];
                    newPurchases[index].amount = e.target.value;
                    setPurchases(newPurchases);
                  }}
                />
              </Td>
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
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Invoices
      </Text>
      <Button onClick={onOpen} mb={4} colorScheme="purple">
        Add Invoice
      </Button>
      {invoices.map((invoice, invoiceIndex) => (
        <Box
          key={invoiceIndex}
          border="1px solid black"
          borderRadius="md"
          p={4}
          bg="purple.100"
          mb={4}
        >
          <Text mb={2}>Invoice {invoice.invoiceNumber}</Text>
          <Button
            onClick={() => handleAddInvoicePurchase(invoiceIndex)}
            mb={2}
            colorScheme="purple"
          >
            Add Purchase
          </Button>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Vendor</Th>
                <Th>Grams</Th>
                <Th>Weight</Th>
                <Th>Price per ct</Th>
                <Th>Amount</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {invoice.purchases &&
                invoice.purchases.map((purchase, purchaseIndex) => (
                  <Tr key={purchaseIndex}>
                    <Td>
                      <Input
                        value={purchase.date}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          newInvoices[invoiceIndex].purchases[
                            purchaseIndex
                          ].date = e.target.value;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.vendor}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          newInvoices[invoiceIndex].purchases[
                            purchaseIndex
                          ].vendor = e.target.value;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.grams}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          newInvoices[invoiceIndex].purchases[
                            purchaseIndex
                          ].grams = e.target.value;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.weight}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          newInvoices[invoiceIndex].purchases[
                            purchaseIndex
                          ].weight = e.target.value;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.pricePerCt}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          newInvoices[invoiceIndex].purchases[
                            purchaseIndex
                          ].pricePerCt = e.target.value;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.amount}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          newInvoices[invoiceIndex].purchases[
                            purchaseIndex
                          ].amount = e.target.value;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() =>
                          handleDeleteInvoicePurchase(
                            invoiceIndex,
                            purchaseIndex
                          )
                        }
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
                    <Input placeholder="Invoice Number" {...field} />
                  )}
                />
                <Controller
                  name="vendorName"
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Vendor Name" {...field} />
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
});
