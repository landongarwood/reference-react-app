import { Box, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { get } from "lodash";
import { useMemo } from "react";
import { useCookiesLive } from "../../hooks";
import { useProductAvailabilityPricing } from "../../hooks/api/queries";
import { convertNumberToCurrencyFormat } from "../../utils/number";

export const SearchResultEntityPrice = ({
  manufacturerProductId,
}: {
  manufacturerProductId?: number;
}) => {
  const [accountCode] = useCookiesLive(["accountCode"]);

  const { data: pricing, isLoading: isLoadingPricing } =
    useProductAvailabilityPricing(accountCode, manufacturerProductId);

  const price = useMemo<number | undefined>(
    () => get(pricing, "[0].price"),
    [pricing]
  );

  if (!accountCode || (!isLoadingPricing && typeof price !== "number")) {
    return null;
  }

  return (
    <Box data-testid="sr-result-entity-price-wrapper">
      <Text color="gray.530" fontSize="xs">
        Price starting at
      </Text>
      {isLoadingPricing ? (
        <Skeleton
          data-testid="sr-result-entity-price-loading-skeleton"
          height="36px"
        />
      ) : (
        <Text
          color="gray.700"
          data-testid="sr-result-entity-price-text"
          fontSize="2xl"
          fontWeight={500}
        >
          {typeof price === "number"
            ? `${convertNumberToCurrencyFormat(price)}`
            : "-"}
        </Text>
      )}
    </Box>
  );
};
