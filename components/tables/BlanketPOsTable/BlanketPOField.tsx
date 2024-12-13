import { Link, Text } from "@chakra-ui/react";
import { memo } from "react";
import {
  INVOICE_DISP_COLUMNS,
  ORDER_LINES_DISP_COLUMNS,
} from "../../../constants/blanketPOsTable";
import { useBlanketPO } from "../../../hooks/api/queries";
import { buildLegacyCriteriaUrl } from "../../../utils/criteria";
import { formatCurrency } from "../../../utils/currency";
import { getAppLink } from "../../../utils/link";

const BlanketPOField = memo(
  ({
    id,
    fieldKey,
    fs,
  }: {
    id: number | undefined;
    fieldKey: "invoiceTotal" | "openOrderValue" | "availableValue";
    fs?: Record<string, string>;
  }) => {
    const { data } = useBlanketPO(id);

    const currencyValue = formatCurrency(data?.[fieldKey]);

    if (fieldKey === "availableValue") {
      return (
        <Text
          as="span"
          color={(data?.[fieldKey] as number) > 0 ? "gray.700" : "red.500"}
        >
          {currencyValue}
        </Text>
      );
    }

    const fsKey = Object.keys(fs ?? {})[0];
    if (currencyValue && fieldKey === "invoiceTotal") {
      return (
        <Link
          color="blue.600"
          href={`${getAppLink("/app/Invoice")}?${buildLegacyCriteriaUrl(
            fs ?? {},
            INVOICE_DISP_COLUMNS.includes(fsKey) || !fsKey
              ? INVOICE_DISP_COLUMNS
              : [...INVOICE_DISP_COLUMNS, fsKey],
            "invoiceNum"
          )}`}
        >
          {currencyValue}
        </Link>
      );
    }

    if (currencyValue && fieldKey === "openOrderValue") {
      return (
        <Link
          color="blue.600"
          href={`${getAppLink("/app/OrderLine")}?${buildLegacyCriteriaUrl(
            fs ?? {},
            ORDER_LINES_DISP_COLUMNS.includes(fsKey) || !fsKey
              ? ORDER_LINES_DISP_COLUMNS
              : [...ORDER_LINES_DISP_COLUMNS, fsKey],
            "orderNum"
          )}`}
        >
          {currencyValue}
        </Link>
      );
    }

    return null;
  }
);

export default BlanketPOField;
