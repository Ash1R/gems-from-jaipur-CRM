// app/login/page.tsx
'use client';

import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="lavender"
    >
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
      >
        <Stack spacing={4}>
          <Text fontSize="2xl" textAlign="center">
          Jems From Jaipur Login
          </Text>
          <Input
            variant="filled"
            placeholder="Username"
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.500' }}
          />
          <Input
            variant="filled"
            placeholder="Password"
            type="password"
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.500' }}
          />
          <Button colorScheme="purple" size="lg" fontSize="md">
            Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
