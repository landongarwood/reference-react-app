import { useQuery } from "@tanstack/react-query";
import { StandardsResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useBundle = (bundleId?: number) => {
  return useQuery(
    [QUERY_KEYS["bundle"], bundleId],
    () =>
      StandardsResourceService.getBundleByIdUsingGet(
        bundleId!,
        "primaryPackage"
      ),
    { enabled: !!bundleId }
  );
};
