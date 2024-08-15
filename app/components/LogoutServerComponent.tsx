import { getSession } from "@auth0/nextjs-auth0";
import { Button, Text, Center, Box } from "@chakra-ui/react";
import Link from "next/link";

export default async function LogoutServerComponent() {
  const session = await getSession();
  const user = session?.user;
  return (
    <>
      <Center
        bg="darkgrey"
        h="100px"
        color="white"
        width="90%"
        borderRadius={5}
        margin={5}
      >
        <Box position="absolute" left={10}>
          <Link href="/home">
            <Button colorScheme="purple">Home</Button>
          </Link>
        </Box>
        {!user && (
          <>
            <Center>
              <Text marginRight={5} as="b">
                You need to Login to proceed
              </Text>
              <Link href="/api/auth/login">
                <Button colorScheme="blue" variant="solid">
                  Login
                </Button>
              </Link>
            </Center>
          </>
        )}
        {user && (
          <>
            <Center>
              <Text marginRight={5} as="b">
                You are signed in a {user.email}
              </Text>
              <Link href="/api/auth/logout">
                <Button colorScheme="red" variant="solid">
                  Logout
                </Button>
              </Link>
            </Center>
          </>
        )}
      </Center>
    </>
  );
}
