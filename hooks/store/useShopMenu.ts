import { useMemo } from "react";
import { SearchCategoryDto } from "../../api";
import { MenuItem, SHOP_MENU } from "../../constants/header";
import { useSearchCategories } from "../api/queries";

const convertSearchedCategoryToMenuItem = (
  category: SearchCategoryDto
): MenuItem => ({
  children: category.subcategories?.map(convertSearchedCategoryToMenuItem),
  key: category.categoryId,
  name: category.categoryName ?? "",
  // TODO: What is the correct path for dynamic search category?
  path: "/",
});

const useShopMenu = (enabled?: boolean) => {
  const { data: categories } = useSearchCategories(enabled);

  const shopMenu = useMemo<MenuItem | null>(() => {
    if (categories) {
      const searchedCategories = categories.map<MenuItem>(
        convertSearchedCategoryToMenuItem
      );
      return {
        ...SHOP_MENU,
        children: [...(SHOP_MENU.children ?? []), ...searchedCategories],
      };
    } else {
      return null;
    }
  }, [categories]);

  return shopMenu;
};

export default useShopMenu;
