"use client";

import { useState } from "react";
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
  Heading
} from "@chakra-ui/react";
import ReactSelect from '../components/ReactSelect';

interface RowData {
  date: string;
  metalType: string;
  rate: string;
  grams: string;
  amount: string;
  vendor: string;
  paid: string;
}

const metalTypes = [
  { value: "Gold", label: "Gold" },
  { value: "Silver", label: "Silver" },
  { value: "", label: "" },

  
];

const vendorTypes = [
  { value: "Swastik Enterprises", label: "Swastik Enterprises" },
  { value: "Pioneer Corporation", label: "Pioneer Corporation" },
  { value: "Narnoli Corporation", label: "Narnoli Corporation" },

  { value: "", label: "" },

];

const MetalInput = () => {
  const [rows, setRows] = useState<RowData[]>([]);

  const addRow = () => {
    setRows([
      { date: getFormattedDate(), metalType: "", rate: "", grams: "", amount: "", vendor: "", paid: "" },
      ...rows,
    ]);
  };

  const handleInputChange = (index: number, field: keyof RowData, value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const deleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  function getFormattedDate(): string {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
        <Button onClick={addRow} colorScheme="purple">Add purchase</Button>
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
              <Tr key={index}>
                <Td>
                  <Input
                    value={row.date}
                    onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <ReactSelect
                    options={metalTypes}
                    value={row.metalType}
                    onChange={(value) => handleInputChange(index, 'metalType', value)}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.rate}
                    onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.grams}
                    onChange={(e) => handleInputChange(index, 'grams', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.amount}
                    onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <ReactSelect
                    options={vendorTypes}
                    value={row.vendor}
                    onChange={(value) => handleInputChange(index, 'vendor', value)}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.paid}
                    onChange={(e) => handleInputChange(index, 'paid', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: "none", borderColor: "black" }}
                  />
                </Td>
                <Td>
                  <Button colorScheme="red" onClick={() => deleteRow(index)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
}

export default MetalInput;
