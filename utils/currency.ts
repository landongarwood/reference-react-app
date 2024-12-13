import { isNumber } from "lodash";

export const formatCurrency = (value?: number, decimals: number = 2) =>
  isNumber(value)
    ? value.toLocaleString(undefined, {
        currency: "USD",
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
        style: "currency",
      })
    : "";
