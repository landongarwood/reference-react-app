import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BundleLinePatchRequestDto,
  BundleLinePatchResponseDto,
  StandardLinesResourceService,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants";

export const useBundleLineUpdate = (bundleId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    BundleLinePatchResponseDto,
    Error,
    { bundleLineId: number; request: BundleLinePatchRequestDto }
  >(
    ({ bundleLineId, request }) => {
      return StandardLinesResourceService.updateBundleLineUsingPatch(
        bundleLineId,
        request
      );
    },
    {
      onSuccess: () => {
        if (bundleId) {
          queryClient.invalidateQueries([QUERY_KEYS["bundle"], bundleId]);
        }
      },
    }
  );
};
