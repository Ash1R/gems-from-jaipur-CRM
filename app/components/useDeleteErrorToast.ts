/* 
eslint-disable 
*/

import { useToast } from "@chakra-ui/react";

export default function useDeleteErrorToast() {
  const toast = useToast();
  return ({ message }) =>
    toast({
      title: "Admin Only action",
      description: `Only Admins can ${message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
}
