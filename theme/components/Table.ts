import { ComponentStyleConfig, theme } from "@chakra-ui/react";

const Table: ComponentStyleConfig = {
  variants: {
    grid: (props) => ({
      ...theme.components.Table.variants?.striped(props),
      table: {
        height: "full",
      },
      tbody: {
        tr: {
          left: 0,
          position: "absolute",
          top: 0,
        },
      },
      td: {
        alignItems: "center",
        color: "gray.700",
        display: "inline-flex",
        fontSize: "xs",
        overflow: "hidden",
        py: 3,
      },
      th: {
        alignItems: "center",
        background: "white",
        color: "gray.700",
        display: "inline-flex",
        overflow: "hidden",
        position: "relative",
        textTransform: "none",
      },
      thead: {
        position: "sticky",
        top: 0,
        tr: {
          borderBottomColor: "gray.700",
          borderBottomWidth: 1,
          th: {
            fontSize: "sm",
            fontWeight: "medium",
          },
        },
        zIndex: "sticky",
      },
      tr: {
        "&.active-row": {
          td: {
            background: "blue.200!",
          },
        },
        "&.has-border": {
          borderBottomColor: "gray.200",
          borderBottomWidth: 1,
        },
        "&.new-row": {
          td: {
            background: "purple.200!",
          },
        },
        "&.new-striped-row": {
          td: {
            background: "purple.250!",
          },
        },
        "&.striped-row:not(.new-striped-row)": {
          borderBottomColor: "gray.200",
          borderBottomWidth: 1,
          td: {
            background: "gray.50!",
          },
        },
        display: "flex",
        td: {
          background: "white",
        },
      },
    }),
  },
};

export default Table;
