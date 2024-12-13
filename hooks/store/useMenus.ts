import { useMemo } from "react";
import { UserRightsDto } from "../../api";
import { AccountType, MenuItem, MENUS } from "../../constants/header";
import { useUserData, useUserRights } from "../api/queries";
import useShopMenu from "./useShopMenu";

const filterMenuItem = (
  menu: MenuItem,
  role: AccountType,
  rights: UserRightsDto[] | undefined
): MenuItem | null => {
  if (menu.roles && !menu.roles.includes(role)) {
    return null;
  }

  if (
    menu.right &&
    rights &&
    !rights.filter((right) => right.rightCode === menu.right).length
  ) {
    return null;
  }

  return {
    ...menu,
    children: filterMenus(menu.children, role, rights),
  };
};

const filterMenus = (
  menus: MenuItem[] | undefined,
  role: AccountType,
  rights: UserRightsDto[] | undefined
) => {
  return menus
    ?.map((menu) => filterMenuItem(menu, role, rights))
    .filter((child) => child) as MenuItem[] | undefined;
};

const useMenus = () => {
  const { data: userData } = useUserData();
  const { data: userRights } = useUserRights();
  const shopMenu = useShopMenu(false);
  const allMenus = useMemo(
    () =>
      filterMenus(
        shopMenu ? [shopMenu, ...MENUS] : MENUS,
        userData?.salesRepUser
          ? AccountType.REP_WITHOUT_ACCOUNT
          : AccountType.NON_REP,
        userRights
      ),
    [shopMenu, userData?.salesRepUser, userRights]
  );

  return allMenus ?? [];
};

export default useMenus;
