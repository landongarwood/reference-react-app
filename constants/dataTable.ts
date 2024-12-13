import {
  useInfiniteDealsList,
  useInfiniteProductsReport,
  useProductsReportMaxId,
  useInfiniteOrderLinesReport,
  useInfiniteStaffList,
  useInfiniteStandardLinesList,
  useDealMaxId,
  useOrderLineMaxId,
  useStaffMaxId,
  useStandardLineMaxId,
  useInfiniteUserList,
  useUserMaxId,
  useShippingAddressMaxId,
  useInfiniteShippingAddressesList,
} from "../hooks/api/queries";
import {
  ColumnType,
  ListingMaxIdQueryHook,
  ListingName,
  ListingQueryHook,
} from "../types";

export const BOOLEAN_VALUES = {
  false: "No",
  true: "Yes",
};
export const CHECKBOX_COLUMN_ID = "_checkbox";
export const FACETS_DISABLED_COLUMN_IDS = ["description"];
export const FILTER_BLANK_OPTIONS = ["_blank_", "_not_blank_"];
export const LISTING_PAGE_QUERIES: {
  [key in ListingName]?: {
    listingQuery: ListingQueryHook;
    listingMaxIdQuery: ListingMaxIdQueryHook;
  };
} = {
  deals: {
    listingMaxIdQuery: useDealMaxId,
    listingQuery: useInfiniteDealsList,
  },
  orderlines: {
    listingMaxIdQuery: useOrderLineMaxId,
    listingQuery: useInfiniteOrderLinesReport,
  },
  product: {
    listingMaxIdQuery: useProductsReportMaxId,
    listingQuery: useInfiniteProductsReport,
  },
  ship_address_list: {
    listingMaxIdQuery: useShippingAddressMaxId,
    listingQuery: useInfiniteShippingAddressesList,
  },
  staff: {
    listingMaxIdQuery: useStaffMaxId,
    listingQuery: useInfiniteStaffList,
  },
  standardlines: {
    listingMaxIdQuery: useStandardLineMaxId,
    listingQuery: useInfiniteStandardLinesList,
  },
  users: {
    listingMaxIdQuery: useUserMaxId,
    listingQuery: useInfiniteUserList,
  },
};
// when you scroll down for over this number, scroll to top button should be visible
export const SCROLL_TO_TOP_AVAILABLE_AT = 5;
export const TABLE_ACTIONS_HEIGHT = 68;
export const TABLE_ACTION_COLUMN_WIDTH = 100;
export const TABLE_COLUMNS_MIN_WIDTHS: {
  [key in ColumnType]: number; // number in rem
} = {
  boolean: 2,
  checkbox: 2.25,
  currency: 8,
  date: 6,
  decimal: 6,
  integer: 7,
  multiText: 12,
  percentage: 5,
  text: 9,
  time: 6,
};
export const TABLE_FILTER_HEIGHT = 67;
export const TABLE_OVERSCAN = 50;
export const TABLE_ROW_HEIGHT = 45;
