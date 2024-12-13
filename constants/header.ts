import { UserPermission } from "../types";

export enum AccountType {
  NON_REP,
  REP_WITH_ACCOUNT,
  REP_WITHOUT_ACCOUNT,
}

export const MENUS: MenuItem[] = [
  {
    children: [
      {
        name: "Account Settings",
        path: "/CBSDirectRep/AdministrationX.php",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Contact Management",
        path: "/CBSDirectRep/rep_contactsX.php",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Rep Contact Management",
        path: "/app/Customization?section=contactinformation",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Bulk Part Replace Tool",
        path: "/app/BulkPartReplace",
        roles: [AccountType.REP_WITHOUT_ACCOUNT, AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Deal Management",
        path: "/app/deals",
      },
      {
        name: "Standard Management",
        path: "/app/StandardLine",
      },
      {
        name: "Price Matrix",
        path: "/CBSDirectRep/PriceMatrixTreeX.php?init=Y",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Pricing Report",
        path: "/app/Pricing/report",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Billing Addresses",
        path: "/CBSDirectRep/BillAddressPageX.php",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Shipping Addresses",
        path: "/app/ShippingAddressManagement",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "User Management",
        path: "/CBSDirectRep/UserPageX.php",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "User Rights Report",
        path: "/CBSDirectRep/user_rights_report.php",
        roles: [AccountType.REP_WITH_ACCOUNT],
      },
      {
        name: "Registered Deals",
        path: "/app/RegisteredDeals",
      },
      {
        name: "Data Maps",
        path: "/app/DataMap",
      },
      {
        name: "Staff List",
        path: "/staff",
        right: UserPermission.MANAGE_APPLICATION_USERS,
      },
    ],
    name: "Administration",
  },
  {
    children: [
      {
        name: "Saved Reports",
        path: "/app/Track",
      },
      {
        name: "Account Report",
        path: "/app/Account",
      },
      {
        name: "Product Report",
        path: "/app/Product",
      },
      {
        name: "Stocking Order Line Report",
        path: "/app/StockingOrderLine",
      },
      {
        children: [
          {
            name: "Searches",
            path: "/app/SearchReport",
          },
          {
            name: "Lowest Cost Dispatch Report",
            path: "app/LowestCostDispatch",
          },
          {
            name: "AMI Log Report",
            path: "/app/AMILog",
          },
          {
            name: "Email Log Report",
            path: "/app/EmailLog",
          },
          // {
          //   name: "Sales By Month",
          //   path: "/app/SalesByMonth",
          // },
          // {
          //   name: "Sales By Account",
          //   path: "/app/SalesByAccount",
          // },
        ],
        name: "Internal Reports",
      },
      {
        children: [
          {
            name: "Invoice Aging Report",
            path: "/CBSDirectRep/AgingReportX.php?reporttype=invoice&tstamp=",
            roles: [AccountType.REP_WITH_ACCOUNT],
          },
          {
            name: "Invoice Line Report",
            path: "/app/InvoiceLine",
          },
          {
            name: "Quote Line Report",
            path: "/app/QuoteLine",
          },
          {
            internal: true,
            name: "Order Line Report",
            path: "/orderlines",
          },
          {
            name: "Expirations",
            path: "/app/Expiration?view_name=Primary+Expirations",
          },
          {
            name: "Category Spend Report",
            path: "/CBSDirectRep/ReportSelector.php?reporttype=category",
            roles: [AccountType.REP_WITH_ACCOUNT],
          },
          {
            name: "Manufacturer Spend Report",
            path: "/CBSDirectRep/ReportSelector.php?reporttype=mfgname",
            roles: [AccountType.REP_WITH_ACCOUNT],
          },
          {
            name: "Product Spend Report",
            path: "/CBSDirectRep/ReportSelector.php?reporttype=mfppr",
            roles: [AccountType.REP_WITH_ACCOUNT],
          },
        ],
        name: "Customer Reports",
      },
    ],
    name: "Reports",
  },
  {
    children: [
      {
        name: "Invoices",
        path: "/app/Invoice",
      },
      {
        name: "Purchase Requests",
        path: "/app/PurchaseRequest?view_name=Pending+Approval",
      },
      {
        name: "Quotes",
        path: "/app/Quote",
      },
      {
        name: "Returns",
        path: "/app/Return",
      },
      {
        name: "Purchase Analysis",
        path: "/app/Optimize",
      },
      {
        name: "Orders",
        path: "/app/OrderManagement",
      },
      {
        name: "Shipments",
        path: "/app/Shipment",
      },
      {
        name: "Inventory",
        path: "/app/Inventory",
      },
      {
        name: "Expiration Calendar",
        path: "/app/Calendar",
      },
      {
        name: "Assets",
        path: "/app/Asset",
      },
      {
        name: "Electronic POs",
        path: "/app/ElectronicPo",
      },
      {
        name: "Stocking Orders",
        path: "/app/StockingOrder",
      },
      {
        name: "Service Orders",
        path: "/app/ServiceOrders",
      },
    ],
    name: "Account Activity",
  },
  {
    name: "Help",
    path: "http://buck.moredirect.com/support/desk/reps/index.php?action=ticket_submit",
  },
];

export type MenuItem = {
  name: string;
  key?: string | number;
  path?: string;
  children?: MenuItem[];
  roles?: AccountType[];
  right?: string;
  internal?: boolean;
};

export const QUICK_LINKS: MenuItem[] = [
  {
    name: "Users",
    path: "/app/Users",
  },
  {
    name: "Standards Catalog",
    path: "/app/Standard/catalog",
    roles: [AccountType.REP_WITH_ACCOUNT],
  },
  {
    name: "Orders",
    path: "/app/OrderManagement",
  },
  {
    name: "Quotes",
    path: "/app/Quote",
  },
  {
    name: "Standards",
    path: "/app/Standard",
  },
  {
    name: "Invoices",
    path: "/app/Invoice",
  },
  {
    internal: true,
    name: "Order Line Report",
    path: "/orderlines",
  },
  {
    name: "Electronic POs",
    path: "/app/ElectronicPo",
  },
  {
    name: "Stocking Orders",
    path: "/app/StockingOrder",
  },
  {
    name: "Service Orders",
    path: "/app/ServiceOrders",
  },
];

export const SHOP_MENU: MenuItem = {
  children: [
    {
      name: "Quick Shop",
      path: "/app/QuickOrder",
    },
    {
      name: "Bulk Order Tool",
      path: "/app/BulkOrder",
    },
    {
      name: "Standards Catalog",
      path: "/app/Standard/catalog",
    },
    {
      name: "Configurators",
      path: "/search/configurators.php",
    },
    {
      name: "Browse All Categories",
      path: "/search/browse.php",
    },
  ],
  name: "Shop",
  roles: [AccountType.REP_WITH_ACCOUNT],
};
