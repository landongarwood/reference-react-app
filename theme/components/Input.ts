import { ComponentStyleConfig, theme } from "@chakra-ui/react";

const Input: ComponentStyleConfig = {
  sizes: {
    md: {
      field: {
        h: 9,
      },
    },
  },
  variants: {
    filter: (props) => {
      const outlineFieldStyles =
        theme.components.Input.variants?.outline(props).field;
      return {
        field: {
          ...outlineFieldStyles,
          _focusVisible: {
            ...outlineFieldStyles?._focusVisible,
            borderColor: "blue.400",
            boxShadow: "none",
          },
          background: "white",
          borderRadius: 2,
        },
      };
    },
    outline: {
      field: {
        _focusVisible: {
          borderColor: "blue.400",
          boxShadow: "none",
        },
        _hover: {
          borderColor: "gray.550",
        },
        _invalid: {
          borderColor: "red.500!",
          boxShadow: "none",
        },
        background: "white",
        borderColor: "gray.400",
        borderRadius: 2,
      },
    },
  },
};

export default Input;
