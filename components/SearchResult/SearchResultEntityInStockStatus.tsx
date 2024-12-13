import { CheckIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { sumBy } from "lodash";
import { useMemo } from "react";
import { useCookiesLive } from "../../hooks";
import { useProductAvailabilityPricing } from "../../hooks/api/queries";
import { ExclamationIcon } from "../icons";

export const SearchResultEntityInStockStatus = ({
  manufacturerProductId,
}: {
  manufacturerProductId?: number;
}) => {
  const [accountCode] = useCookiesLive(["accountCode"]);

  const { data: pricing, isLoading: isLoadingPricing } =
    useProductAvailabilityPricing(accountCode, manufacturerProductId);

  const inStock = useMemo(() => {
    let hasValidNumber = false;

    const totalQuantity = sumBy(pricing ?? [], (item) => {
      const sum = sumBy(item.warehouseAvailability, (wa) => {
        if (typeof wa.quantity === "number") {
          hasValidNumber = true;
          return wa.quantity;
        } else {
          return 0;
        }
      });
      return sum;
    });

    if (hasValidNumber) {
      return totalQuantity > 0;
    }

    return (pricing ?? []).some(({ availability }) => availability);
  }, [pricing]);

  if (!accountCode || (!isLoadingPricing && pricing === undefined)) {
    return null;
  }

  return (
    <Box
      alignItems="center"
      color={inStock ? "green.200" : "#D93232"}
      data-testid="sr-result-in-stock-availability"
      display="flex"
      justifyContent="start"
      w={150}
    >
      {inStock ? (
        <CheckIcon h={2} mr={2} w={2} />
      ) : (
        <ExclamationIcon h={2} mr={2} w={2} />
      )}
      <Text
        data-testid="sr-result-entity-in-stock-availability-text"
        fontSize="sm"
      >
        {inStock ? "In Stock" : "Backordered"}
      </Text>
    </Box>
  );
};
