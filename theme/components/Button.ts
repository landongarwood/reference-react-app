import { ComponentStyleConfig, theme } from "@chakra-ui/react";

const baseButtonStyle = {
  fontSize: "sm",
};

const Button: ComponentStyleConfig = {
  baseStyle: {
    _focusVisible: {
      boxShadow: "none",
    },
    borderRadius: 2,
    borderStyle: "solid",
    borderWidth: 1,
    fontWeight: "normal",
    height: 9,
  },
  variants: {
    link: (props) => ({
      ...theme.components.Button.variants?.link(props),
      border: "none",
    }),
    "navigation-menu": {
      _hover: {
        bg: "transparent",
        borderBottomColor: "blue.700",
      },
      bg: "transparent",
      borderBottomWidth: 4,
      borderColor: "transparent",
      borderRadius: "radius",
      borderTopWidth: 4,
      fontWeight: 500,
      py: "9px",
    },
    outline: (props) => ({
      ...baseButtonStyle,
      ...theme.components.Button.variants?.outline(props),
    }),
    solid: (props) => ({
      ...baseButtonStyle,
      ...(props.colorScheme === "gray"
        ? {
            ...theme.components.Button.variants?.solid(props),
            _disabled: {
              color: "gray.450",
            },
            _hover: {
              bg: "gray.50",
              borderColor: "gray.550",
            },
            bg: "gray.50",
            borderColor: "gray.400",
            color: "gray.600",
          }
        : props.colorScheme === "blue"
        ? {
            ...theme.components.Button.variants?.solid(props),
            _active: {
              bg: "blue.600",
            },
            _disabled: {
              opacity: ".6",
            },
            _hover: {
              bg: "blue.500",
            },
            bg: "blue.700",
            borderColor: "transparent",
          }
        : { ...theme.components.Button.variants?.solid(props) }),
    }),
    unstyled: () => ({
      ...theme.components.Button.variants?.unstyled,
      border: "none",
    }),
  },
};

export default Button;
