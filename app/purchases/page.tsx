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
  const [plainPurchases, setPlainPurchases] = useState<any[]>([]);
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
    const fetchPlainPurchases = async () => {
      const response = await fetch("/api/plainpurchases");
      const data = await response.json();
      setPlainPurchases(data);
    };
    fetchPlainPurchases();
    fetchInvoices();
  }, []);

  const handleAddPlainPurchase = async () => {
    const newPurchase = {
      date: new Date(),
      vendor: "",
      grams: 0.0,
      weight: 0.0,
      pricePerCt: 0.0,
      amount: 0.0,
    };

    try {
      const response = await fetch("/api/plainpurchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchase),
      });

      if (!response.ok) {
        throw new Error("Failed to add plain purchase");
      }

      const savedPurchase = await response.json();
      setPlainPurchases([...plainPurchases, savedPurchase]);
    } catch (error) {
      console.error("Error adding plain purchase:", error);
    }
  };

  const handleDeletePlainPurchase = async (index: number) => {
    const purchaseToDelete = plainPurchases[index];

    try {
      const response = await fetch(
        `/api/plainpurchases?id=${purchaseToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete purchase");
      }

      setPlainPurchases(plainPurchases.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting purchase:", error);
    }
  };

  const handleSavePlainPurchaseRow = async (index: number) => {
    const updatedPlainPurchase = plainPurchases[index];
    if (updatedPlainPurchase.id) {
      try {
        console.log(
          `Updating plain purchase with id ${updatedPlainPurchase.id}...`
        );
        const response = await fetch("/api/plainpurchases", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedPlainPurchase,
          }),
        });
        if (!response.ok) throw new Error("Failed to update row");
        console.log("Row updated:", updatedPlainPurchase);
        const newRows = [...plainPurchases];
        newRows[index].dirty = false;
        setPlainPurchases(newRows);
      } catch (error) {
        console.error("Update row error:", error);
      }
    }
  };

  const handleAddInvoice = async (data: any) => {
    const newInvoice = {
      invoiceNumber: data.invoiceNumber,
      vendorName: data.vendorName,
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

  const handleDeleteInvoice = async (id: number) => {
    try {
      console.log("Deleting invoice with id ", id);
      const response = await fetch(`/api/invoices?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete row");
      console.log("Invoice deleted:", id);
      const newRows = invoices.filter((inv, i) => inv.id !== id);
      setInvoices(newRows);
    } catch (error) {
      console.error("Delete invoice error:", error);
    }
  };

  const handleAddInvoicePurchase = async (
    invoiceIndex: number,
    id: number,
    vendor: string
  ) => {
    const newPurchaseWithInvoice = {
      invoiceId: id,
      date: new Date(),
      vendor: vendor,
      grams: 0.0,
      weight: 0.0,
      pricePerCt: 0.0,
      amount: 0.0,
    };

    try {
      const response = await fetch("/api/invoicepurchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPurchaseWithInvoice),
      });

      if (!response.ok) {
        throw new Error("Failed to add plain purchase");
      }

      const savedPurchase = await response.json();
      const newInvoices = [...invoices];
      if (!newInvoices[invoiceIndex].purchases) {
        newInvoices[invoiceIndex].purchases = [];
      }
      newInvoices[invoiceIndex].purchases.push(savedPurchase);
      setInvoices(newInvoices);
    } catch (error) {
      console.error("Error adding plain purchase:", error);
    }
  };

  const handleDeleteInvoicePurchase = async (
    invoiceIndex: number,
    purchaseId: number
  ) => {
    try {
      console.log(`Deleting purchase with id ${purchaseId}...`);
      const response = await fetch(`/api/invoicepurchases?id=${purchaseId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete purchase");
      console.log("Purchase deleted with ID:", purchaseId);
      const newInvoices = [...invoices];
      newInvoices[invoiceIndex].purchases = newInvoices[
        invoiceIndex
      ].purchases.filter((p) => p.id !== purchaseId);
      setInvoices(newInvoices);
    } catch (error) {
      console.error("Delete purchase error:", error);
    }
  };

  const handleSaveInvoicePurchaseRow = async (
    purchase,
    invoiceIndex,
    purchaseIndex
  ) => {
    try {
      console.log(`Updating invoice purchase with id ${purchase.id}...`);
      const response = await fetch("/api/invoicepurchases", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
      });
      if (!response.ok) throw new Error("Failed to update row");
      console.log("Purchase updated with id:", purchase.id);
      const newInvoices = [...invoices];
      newInvoices[invoiceIndex].purchases[purchaseIndex].dirty = false;
      setInvoices(newInvoices);
    } catch (error) {
      console.error("Update row error:", error);
    }
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
      <Button onClick={handleAddPlainPurchase} mb={4} colorScheme="purple">
        Add Plain Purchase
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
          {plainPurchases.map((purchase, index) => (
            <Tr key={index}>
              <Td>
                <Input
                  value={purchase.date}
                  onChange={(e) => {
                    const newPurchases = [...plainPurchases];
                    newPurchases[index].date = e.target.value;
                    newPurchases[index].dirty = true;
                    setPlainPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.vendor}
                  onChange={(e) => {
                    const newPurchases = [...plainPurchases];
                    newPurchases[index].vendor = e.target.value;
                    newPurchases[index].dirty = true;
                    setPlainPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.grams}
                  onChange={(e) => {
                    const newPurchases = [...plainPurchases];
                    newPurchases[index].grams = e.target.value;
                    newPurchases[index].dirty = true;
                    setPlainPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.weight}
                  onChange={(e) => {
                    const newPurchases = [...plainPurchases];
                    newPurchases[index].weight = e.target.value;
                    newPurchases[index].dirty = true;
                    setPlainPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.pricePerCt}
                  onChange={(e) => {
                    const newPurchases = [...plainPurchases];
                    newPurchases[index].pricePerCt = e.target.value;
                    newPurchases[index].dirty = true;
                    setPlainPurchases(newPurchases);
                  }}
                />
              </Td>
              <Td>
                <Input
                  value={purchase.amount}
                  onChange={(e) => {
                    const newPurchases = [...plainPurchases];
                    newPurchases[index].amount = e.target.value;
                    newPurchases[index].dirty = true;
                    setPlainPurchases(newPurchases);
                  }}
                />
              </Td>
              {purchase.dirty && (
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleSavePlainPurchaseRow(index)}
                  >
                    Save
                  </Button>
                </Td>
              )}
              <Td>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeletePlainPurchase(index)}
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
          key={invoice.id}
          border="1px solid black"
          borderRadius="md"
          p={4}
          bg="purple.100"
          mb={4}
        >
          <Text mb={2}>Invoice {invoice.invoiceNumber}</Text>
          <Button
            onClick={() =>
              handleAddInvoicePurchase(
                invoiceIndex,
                invoice.id,
                invoice.vendorName
              )
            }
            mb={2}
            colorScheme="purple"
          >
            Add Purchase
          </Button>
          {(!invoice.purchases || invoice.purchases.length === 0) && (
            <Button
              aria-label="Delete Invoice"
              onClick={() => handleDeleteInvoice(invoice.id)}
              colorScheme="red"
              mb={2}
              ml={20}
            >
              Delete Empty Invoice
            </Button>
          )}
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
                  <Tr key={purchase.id}>
                    <Td>
                      <Input
                        value={purchase.date}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          const pToUpdate =
                            newInvoices[invoiceIndex].purchases[purchaseIndex];
                          pToUpdate.date = e.target.value;
                          pToUpdate.dirty = true;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.vendor}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          const pToUpdate =
                            newInvoices[invoiceIndex].purchases[purchaseIndex];
                          pToUpdate.vendor = e.target.value;
                          pToUpdate.dirty = true;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.grams}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          const pToUpdate =
                            newInvoices[invoiceIndex].purchases[purchaseIndex];
                          pToUpdate.grams = e.target.value;
                          pToUpdate.dirty = true;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.weight}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          const pToUpdate =
                            newInvoices[invoiceIndex].purchases[purchaseIndex];
                          pToUpdate.weight = e.target.value;
                          pToUpdate.dirty = true;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.pricePerCt}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          const pToUpdate =
                            newInvoices[invoiceIndex].purchases[purchaseIndex];
                          pToUpdate.pricePerCt = e.target.value;
                          pToUpdate.dirty = true;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    <Td>
                      <Input
                        value={purchase.amount}
                        onChange={(e) => {
                          const newInvoices = [...invoices];
                          const pToUpdate =
                            newInvoices[invoiceIndex].purchases[purchaseIndex];
                          pToUpdate.amount = e.target.value;
                          pToUpdate.dirty = true;
                          setInvoices(newInvoices);
                        }}
                      />
                    </Td>
                    {purchase.dirty && (
                      <Td>
                        <Button
                          colorScheme="blue"
                          onClick={() =>
                            handleSaveInvoicePurchaseRow(
                              purchase,
                              invoiceIndex,
                              purchaseIndex
                            )
                          }
                        >
                          Save
                        </Button>
                      </Td>
                    )}
                    <Td>
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() =>
                          handleDeleteInvoicePurchase(invoiceIndex, purchase.id)
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
