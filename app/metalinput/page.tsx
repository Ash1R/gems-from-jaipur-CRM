"use client";

import { useState, useEffect } from "react";
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
  VStack,
  Heading,
} from "@chakra-ui/react";
import ReactSelect, { Option } from "../components/ReactSelect";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import useGfjRoles from "../components/useGfjRoles";
import Role from "../components/RoleConstants";

interface RowData {
  id?: number;
  date: string;
  metalType: Option | null;
  rate: string;
  grams: string;
  amount: string;
  vendor: Option | null;
  paid: string;
}

const metalTypes: Option[] = [
  { value: "Gold", label: "Gold" },
  { value: "Silver", label: "Silver" },
  { value: "", label: "" },
];

const vendorTypes: Option[] = [
  { value: "Swastik Enterprises", label: "Swastik Enterprises" },
  { value: "Pioneer Corporation", label: "Pioneer Corporation" },
  { value: "Narnoli Corporation", label: "Narnoli Corporation" },
  { value: "", label: "" },
];

export default withPageAuthRequired(function MetalInput() {
  const [rows, setRows] = useState<RowData[]>([]);
  const role = useGfjRoles();
  console.log("Role is ", role);
  useEffect(() => {
    const fetchRows = async () => {
      try {
        console.log("Fetching data...");
        const response = await fetch("/api/metal-purchases");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data: RowData[] = await response.json();
        console.log("Data fetched:", data);
        setRows(
          data.map((d) => ({
            ...d,
            metalType: metalTypes.find((m) => m.value === d.metalType) || null,
            vendor: vendorTypes.find((v) => v.value === d.vendor) || null,
          }))
        );
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchRows();
  }, []);

  const addRow = async () => {
    const newRow: RowData = {
      date: getFormattedDate(),
      metalType: null,
      rate: "",
      grams: "",
      amount: "",
      vendor: null,
      paid: "",
    };

    try {
      console.log("Adding new row...");
      const response = await fetch("/api/metal-purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newRow,
          metalType: newRow.metalType?.value || "",
          vendor: newRow.vendor?.value || "",
        }),
      });
      if (!response.ok) throw new Error("Failed to add row");
      const savedRow: RowData = await response.json();
      console.log("New row added:", savedRow);
      setRows([
        { ...savedRow, metalType: null, vendor: null }, // Adjust for Option types
        ...rows,
      ]);
    } catch (error) {
      console.error("Add row error:", error);
    }
  };

  const handleInputChange = async (
    index: number,
    field: keyof RowData,
    value: any
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);

    const updatedRow = newRows[index];
    if (updatedRow.id) {
      try {
        console.log(`Updating row with id ${updatedRow.id}...`);
        const response = await fetch("/api/metal-purchases", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedRow,
            metalType: updatedRow.metalType?.value || "",
            vendor: updatedRow.vendor?.value || "",
          }),
        });
        if (!response.ok) throw new Error("Failed to update row");
        console.log("Row updated:", updatedRow);
      } catch (error) {
        console.error("Update row error:", error);
      }
    }
  };

  const deleteRow = async (index: number) => {
    const rowToDelete = rows[index];
    if (rowToDelete.id) {
      try {
        console.log(`Deleting row with id ${rowToDelete.id}...`);
        const response = await fetch(
          `/api/metal-purchases?id=${rowToDelete.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete row");
        console.log("Row deleted:", rowToDelete.id);
      } catch (error) {
        console.error("Delete row error:", error);
      }
    }

    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  function getFormattedDate(): string {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  return (
    <Box p={4}>
      <Heading textAlign="center" mb={7} size="xl">
        Metal Purchases
      </Heading>
      <VStack align="start">
        <Button onClick={addRow} colorScheme="purple">
          Add purchase
        </Button>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Metal type</Th>
              <Th>Rate</Th>
              <Th>Grams</Th>
              <Th>Amount</Th>
              <Th>Vendor</Th>
              <Th>Paid?</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => (
              <Tr key={row.id || index}>
                <Td>
                  <Input
                    value={row.date}
                    onChange={(e) =>
                      handleInputChange(index, "date", e.target.value)
                    }
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <ReactSelect
                    options={metalTypes}
                    value={row.metalType}
                    onChange={(value) =>
                      handleInputChange(index, "metalType", value)
                    }
                    placeholder="Select Metal Type"
                  />
                </Td>
                <Td>
                  <Input
                    value={row.rate}
                    onChange={(e) =>
                      handleInputChange(index, "rate", e.target.value)
                    }
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.grams}
                    onChange={(e) =>
                      handleInputChange(index, "grams", e.target.value)
                    }
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.amount}
                    onChange={(e) =>
                      handleInputChange(index, "amount", e.target.value)
                    }
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <ReactSelect
                    options={vendorTypes}
                    value={row.vendor}
                    onChange={(value) =>
                      handleInputChange(index, "vendor", value)
                    }
                    placeholder="Select Vendor"
                  />
                </Td>
                <Td>
                  <Input
                    value={row.paid}
                    onChange={(e) =>
                      handleInputChange(index, "paid", e.target.value)
                    }
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                {role === Role.VWD && (
                  <Td>
                    <Button colorScheme="red" onClick={() => deleteRow(index)}>
                      Delete
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
});
