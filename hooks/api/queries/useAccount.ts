import { useQuery } from "@tanstack/react-query";
import { AccountDetailsDto, AccountsResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";

export const useAccount = (accountCode?: string) => {
  return useQuery<AccountDetailsDto>(
    [QUERY_KEYS["account"], accountCode],
    () => AccountsResourceService.getAccountUsingGet(accountCode ?? ""),
    { enabled: !!accountCode }
  );
};
