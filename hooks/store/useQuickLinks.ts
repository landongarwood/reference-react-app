import { useMemo } from "react";
import { AccountType, QUICK_LINKS } from "../../constants/header";
import { useUserData } from "../api/queries";

const useQuickLinks = () => {
  const { data: userData } = useUserData();
  return useMemo(
    () =>
      QUICK_LINKS.filter(
        (item) =>
          !item.roles ||
          item.roles.includes(
            userData?.salesRepUser
              ? AccountType.REP_WITHOUT_ACCOUNT
              : AccountType.NON_REP
          )
      ),
    [userData?.salesRepUser]
  );
};

export default useQuickLinks;
