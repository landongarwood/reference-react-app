import { useToast } from "@chakra-ui/react";
import { ReactElement, useCallback } from "react";

export const useAppToast = () => {
  const toast = useToast();

  const successToast = useCallback(
    (message: ReactElement | string) => {
      toast({
        description: message,
        duration: 5000, // 5 secs
        isClosable: true,
        position: "top",
        status: "success",
      });
    },
    [toast]
  );

  const errorToast = useCallback(
    (message: ReactElement | string) => {
      toast({
        description: message,
        duration: 5000, // 5 secs
        isClosable: true,
        position: "top",
        status: "error",
      });
    },
    [toast]
  );

  return { errorToast, successToast };
};
