import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle((props) => {
  const { status } = props;
  return status === "info"
    ? {
        container: {
          bg: "green.700",
          borderColor: "blue.700!",
          borderLeftWidth: "2px!",
          color: "green.100",
          fontSize: "md",
        },
      }
    : {};
});

const Alert = defineMultiStyleConfig({
  baseStyle,
});

export default Alert;
