// app/layout.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <head>
          <title>Jems From Jaipur Enterprise App</title>
        </head>
        <body>
          <ChakraProvider>{children}</ChakraProvider>
        </body>
      </UserProvider>
    </html>
  );
}
