import { useQuery } from "@tanstack/react-query";
import { BlanketPoResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useBlanketPO = (poId?: number) => {
  return useQuery(
    [QUERY_KEYS["blanket-po"], poId],
    () => BlanketPoResourceService.getBlanketPoUsingGet(poId!),
    { enabled: !!poId }
  );
};
