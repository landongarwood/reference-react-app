import { useQuery } from "@tanstack/react-query";
import { AccountCreditDetailsDto, AccountsResourceService } from "../../../api";
import { QUERY_KEYS } from "../../../constants/query";
import { ACCOUNT_CREDIT_CACHE_COOKIE_NAME } from "../../../constants/salesSummary";
import { useSavedApiResult } from "../../useSavedApiResult";

export const useAccountCredit = (accountCode?: string) => {
  const queryKey = [QUERY_KEYS["account-credit"], accountCode];
  const [savedData, setSavedData] = useSavedApiResult<AccountCreditDetailsDto>(
    ACCOUNT_CREDIT_CACHE_COOKIE_NAME
  );

  return useQuery(
    [queryKey],
    async () => {
      if (savedData !== null) {
        return savedData;
      }
      const { creditDetails } =
        await AccountsResourceService.getAccountCreditUsingGet(accountCode!);
      setSavedData(creditDetails || {});

      return (creditDetails as AccountCreditDetailsDto) || {};
    },
    {
      enabled: !!accountCode,
    }
  );
};
