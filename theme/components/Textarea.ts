import { ComponentStyleConfig } from "@chakra-ui/react";

const Textarea: ComponentStyleConfig = {
  sizes: {
    md: {
      fontSize: "sm",
      h: 20,
    },
  },
  variants: {
    outline: {
      _focusVisible: {
        borderColor: "blue.400",
        boxShadow: "none",
      },
      _hover: {
        borderColor: "gray.550",
      },
      _invalid: {
        boxShadow: "none",
      },
      background: "white",
      borderColor: "gray.400",
      borderRadius: 2,
    },
  },
};

export default Textarea;
