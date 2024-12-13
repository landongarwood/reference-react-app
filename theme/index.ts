import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Alert from "./components/Alert";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Form from "./components/Form";
import FormError from "./components/FormError";
import Input from "./components/Input";
import Link from "./components/Link";
import Select from "./components/Select";
import Table from "./components/Table";
import Textarea from "./components/Textarea";
import fonts from "./fonts";
import styles from "./styles";
import zIndices from "./zIndices";

const theme = extendTheme({
  colors,
  components: {
    Alert,
    Button,
    Checkbox,
    Form,
    FormError,
    Input,
    Link,
    Select,
    Table,
    Textarea,
  },
  fonts,
  styles,
  zIndices,
});

export default theme;
