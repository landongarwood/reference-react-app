import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ProductLineResponseDto,
  ProductPatchRequestDto,
  ProductsResourceService,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useProductUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ProductLineResponseDto,
    Error,
    { productId: number; request: ProductPatchRequestDto }
  >(
    ({ productId, request }) => {
      return ProductsResourceService.updateProductUsingPatch(
        productId,
        request
      );
    },
    {
      onSuccess: (response, { productId }) => {
        queryClient.invalidateQueries([
          QUERY_KEYS["product-details"],
          productId,
        ]);
      },
    }
  );
};
