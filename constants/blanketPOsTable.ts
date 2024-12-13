export const INVOICE_DISP_COLUMNS = [
  "reserved_select_row",
  "accountCode",
  "account",
  "invoiceNum",
  "custPo",
  "invoiceDate",
  "orderNum",
  "reference",
  "subtotal",
  "shipAndHand",
  "salesTax",
  "fees",
  "total",
  "balance",
  "reserved_actions",
];

export const ORDER_LINES_DISP_COLUMNS = [
  "reserved_select_row",
  "accountCode",
  "orderNum",
  "custPo",
  "orderDate",
  "mfgName",
  "mfgPart",
  "catName",
  "qtyOrdered",
  "unitPrice",
  "totalPrice",
  "description",
  "reserved_actions",
];

export const STORED_IN_ALLOWWED_DEFAULT_HEADERS = [
  "PO",
  "Reference",
  "Project",
  "Cost Center",
];

export const STORED_IN_HEADER_MAPPING: Record<string, string> = {
  attention: "attention",
  costCenter: "costCtr",
  instructions: "internalNotes",
  notes: "configNotes",
  po: "custPo",
  project: "project",
  reference: "reference",
};
