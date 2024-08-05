'use client';

import { useState, useEffect, useMemo } from 'react';
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
} from '@chakra-ui/react';

interface RowData {
  id?: number;
  date: string;
  description: string;
  withdraw: string;
  received: string;
}

const Office = () => {
  const [rows, setRows] = useState<RowData[]>([]);

  useEffect(() => {
    const fetchRows = async () => {
      const response = await fetch('/api/expenses');
      const data: RowData[] = await response.json();
      setRows(data);
    };

    fetchRows();
  }, []);

  const addRow = async () => {
    const newRow: RowData = {
      date: getFormattedDate(),
      description: '',
      withdraw: '0',
      received: '0',
    };

    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRow),
    });

    const savedRow: RowData = await response.json();
    setRows([savedRow, ...rows]);
  };

  const handleInputChange = async (
    index: number,
    field: keyof RowData,
    value: string
  ) => {
    const newRows = [...rows];
    newRows[index] = {
      ...newRows[index],
      [field]: value,
    };
    setRows(newRows);

    const updatedRow = newRows[index];
    if (updatedRow.id) {
      await fetch(`/api/expenses/${updatedRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRow),
      });
    }
  };

  const deleteRow = async (index: number) => {
    const rowToDelete = rows[index];

    if (rowToDelete.id) {
      await fetch(`/api/expenses?id=${rowToDelete.id}`, {
        method: 'DELETE',
      });
    }

    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const getFormattedDate = (): string => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const calculateBalance = (): number => {
    const totalReceived = rows.reduce((sum, row) => sum + (parseFloat(row.received) || 0), 0);
    const totalWithdraw = rows.reduce((sum, row) => sum + (parseFloat(row.withdraw) || 0), 0);
    return totalReceived - totalWithdraw;
  };

  const balance = useMemo(calculateBalance, [rows]);

  return (
    <Box p={4}>
      <Heading textAlign="center" mb={7} size="xl">
        Office Expenses
      </Heading>
      <Heading textAlign="center" mb={4} size="md">
        Office Balance: {balance.toFixed(2)}
      </Heading>
      <VStack align="start">
        <Button onClick={addRow} colorScheme="purple">
          Add expense
        </Button>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Withdraw</Th>
              <Th>Received</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, index) => (
              <Tr key={row.id || index}>
                <Td>
                  <Input
                    value={row.date}
                    onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: 'none', borderColor: 'black' }}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: 'none', borderColor: 'black' }}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.withdraw}
                    onChange={(e) => handleInputChange(index, 'withdraw', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: 'none', borderColor: 'black' }}
                  />
                </Td>
                <Td>
                  <Input
                    value={row.received}
                    onChange={(e) => handleInputChange(index, 'received', e.target.value)}
                    borderColor="black"
                    _focus={{ boxShadow: 'none', borderColor: 'black' }}
                  />
                </Td>
                <Td>
                  <Button colorScheme="red" onClick={() => deleteRow(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default Office;
