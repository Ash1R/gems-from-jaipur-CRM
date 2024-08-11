"use client"; // Add this at the top

import {
  Box,
  VStack,
  HStack,
  IconButton,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaBriefcase, FaWarehouse, FaGem, FaBuilding } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="4"
      flexDirection={{ base: "column", md: "row" }}
    >
      <VStack spacing={8} alignItems="flex-start">
        <Heading as="h1" size="xl" mb={10}>
          Gems from Jaipur - CRM
        </Heading>

        <HStack spacing={4}>
          <IconButton
            aria-label="Job Display"
            icon={<FaBriefcase />}
            boxSize={20}
            onClick={() => router.push("/jobdisplay")}
            variant="solid"
            color="blue"
          />
          <Text fontSize="lg">Job Display</Text>
        </HStack>

        <HStack spacing={4}>
          <IconButton
            aria-label="Metal Input"
            icon={<FaWarehouse />}
            boxSize={20}
            onClick={() => router.push("/metalinput")}
            variant="solid"
            color="red"
          />
          <Text fontSize="lg">Metal Input</Text>
        </HStack>

        <HStack spacing={4}>
          <IconButton
            aria-label="Diamond Input"
            icon={<FaGem />}
            boxSize={20}
            onClick={() => router.push("/purchases")}
            variant="solid"
            color="green"
          />
          <Text fontSize="lg">Diamond Input</Text>
        </HStack>

        <HStack spacing={4}>
          <IconButton
            aria-label="Office Expenses"
            icon={<FaBuilding />}
            boxSize={20}
            onClick={() => router.push("/officeexpense")}
            variant="solid"
            color="darkmagenta"
          />
          <Text fontSize="lg">Office Expenses</Text>
        </HStack>
      </VStack>
    </Box>
  );
}
