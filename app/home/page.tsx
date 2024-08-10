"use client"; // Add this at the top

import { Box, VStack, IconButton, Heading, Text } from '@chakra-ui/react';
import { FaBriefcase, FaWarehouse, FaGem, FaBuilding } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding="4"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <VStack spacing={8}>
        <Heading as="h1" size="xl" mb={10}>App Navigation</Heading>
        
        <VStack spacing={4}>
          <IconButton
            aria-label="Job Display"
            icon={<FaBriefcase />}
            boxSize={20}
            onClick={() => router.push('/jobdisplay')}
            variant="outline"
          />
          <Text fontSize="lg">Job Display</Text>
        </VStack>
        
        <VStack spacing={4}>
          <IconButton
            aria-label="Metal Input"
            icon={<FaWarehouse />}
            boxSize={20}
            onClick={() => router.push('/metalinput')}
            variant="outline"
          />
          <Text fontSize="lg">Metal Input</Text>
        </VStack>
        
        <VStack spacing={4}>
          <IconButton
            aria-label="Diamond Input"
            icon={<FaGem />}
            boxSize={20}
            onClick={() => router.push('/purchases')}
            variant="outline"
          />
          <Text fontSize="lg">Diamond Input</Text>
        </VStack>
        
        <VStack spacing={4}>
          <IconButton
            aria-label="Office Expenses"
            icon={<FaBuilding />}
            boxSize={20}
            onClick={() => router.push('/officeexpense')}
            variant="outline"
          />
          <Text fontSize="lg">Office Expenses</Text>
        </VStack>
        
      </VStack>
    </Box>
  );
}
