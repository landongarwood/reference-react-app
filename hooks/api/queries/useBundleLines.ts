import { useQueries } from "@tanstack/react-query";
import {
  BundleLineDetailDto,
  StandardLinesResourceService,
} from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useBundleLines = (bundleLineIds: number[]) => {
  return useQueries({
    queries: bundleLineIds.map((bundleLineId) => {
      return {
        keepPreviousData: true,
        queryFn: async () => {
          const data = await StandardLinesResourceService.getBundleLineUsingGet(
            bundleLineId
          );
          return data as BundleLineDetailDto;
        },
        queryKey: [QUERY_KEYS["bundle-line"], bundleLineId],
      };
    }),
  });
};
