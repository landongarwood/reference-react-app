import { useQuery } from "@tanstack/react-query";
import { BlanketPoResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useBlanketPOs = (accountId?: number) => {
  return useQuery(
    [QUERY_KEYS["blanket-pos"], accountId],
    () => BlanketPoResourceService.getBlanketPoByAccountUsingGet(accountId),
    { enabled: !!accountId }
  );
};
