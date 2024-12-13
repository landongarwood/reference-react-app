export const convertNumberToCurrencyFormat = (value?: number) => {
  const formatter = Intl.NumberFormat("en", {
    currency: "USD",
    notation: "compact",
    style: "currency",
  });

  return formatter.format(value ?? 0);
};

export const convertNumberToPercentFormat = (value?: number) => {
  const formatter = Intl.NumberFormat("en", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
    style: "unit",
    unit: "percent",
  });

  return formatter.format(value ?? 0);
};
