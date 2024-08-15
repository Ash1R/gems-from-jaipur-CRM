"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { AtSignIcon } from "@chakra-ui/icons";
import { Stack, Button, Text, Center } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function LogoutComponent() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <>
      <Center margin={5}>
        {!user && (
          <>
            <Button
              rightIcon={<AtSignIcon />}
              colorScheme="blue"
              variant="solid"
              onClick={() => router.push("/api/auth/login")}
            >
              Login
            </Button>
          </>
        )}
        {user && (
          <>
            <Stack direction="row" spacing={4} border={1} borderColor="black">
              <Text as="b">You are signed in a {user.email}</Text>
              <Button
                colorScheme="red"
                variant="solid"
                onClick={() => router.push("/api/auth/logout")}
              >
                Logout
              </Button>
            </Stack>
          </>
        )}
      </Center>
    </>
  );
}
