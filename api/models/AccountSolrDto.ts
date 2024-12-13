/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Links } from './Links';

export type AccountSolrDto = {
  accountCode?: string;
  accountId?: number;
  accountSummaryId?: string;
  accountType?: string;
  active?: string;
  addCreditCartLoad?: string;
  address?: string;
  address2?: string;
  allowStocking?: string;
  arRepId?: string;
  brand?: string;
  cell?: string;
  city?: string;
  collectorId?: string;
  companyName?: string;
  createdDate?: string;
  creditLimit?: number;
  customerClass?: string;
  fax?: string;
  firstOrderDate?: string;
  freight?: number;
  invoiceAgingCurrent?: number;
  invoiceAgingPastDue1To30Days?: number;
  invoiceAgingPastDue31To60Days?: number;
  invoiceAgingPastDueOver61Days?: number;
  invoiceMethod?: string;
  lastOrderDate?: string;
  lastQuoteDate?: string;
  leasingAccount?: boolean;
  links?: Links;
  logoUrl?: string;
  modifiedDate?: string;
  onHold?: string;
  orderShipping?: string;
  orderTax?: string;
  parentAccountId?: string;
  paymentType?: string;
  physicalAddress?: string;
  physicalAddress2?: string;
  physicalCity?: string;
  physicalCompanyName?: string;
  physicalState?: string;
  physicalZip?: string;
  quoteShipping?: string;
  quoteTax?: string;
  repEmail?: string;
  repId?: string;
  repTeamEmail?: string;
  salesDirector?: string;
  salesForceId?: string;
  salesRep?: string;
  solrId?: any;
  source?: string;
  state?: string;
  taxExempt?: string;
  telephone?: string;
  useRepHold?: string;
  zip?: string;
};

