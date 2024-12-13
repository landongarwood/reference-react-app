import { Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: {
    "#popularProducts svg g g g rect": {
      cursor: "pointer",
    },
    "#savingsByCategory g g g": {
      cursor: "pointer",
    },
    "#savingsByManufacturer g g g": {
      cursor: "pointer",
    },
    "#spendByCategory svg g": {
      cursor: "pointer",
    },
    "#spendByLocation svg g": {
      cursor: "pointer",
    },
    "#spendByManufacturer svg g": {
      cursor: "pointer",
    },
    "#spendByState svg path": {
      cursor: "pointer",
    },
    "#yearOverYearSpend svg g g rect": {
      cursor: "pointer",
    },
    ".chakra-popover__popper": {
      zIndex: "modal !important",
    },
    ".szh-menu": {
      zIndex: "top",
    },
  },
};

export default styles;
