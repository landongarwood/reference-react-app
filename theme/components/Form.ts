import { formAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(formAnatomy.keys);

const baseStyle = definePartsStyle({
  helperText: {
    color: "green.200",
    fontSize: "xs",
    fontWeight: 500,
  },
});

export const FormControl = defineMultiStyleConfig({
  baseStyle,
});

export default FormControl;
