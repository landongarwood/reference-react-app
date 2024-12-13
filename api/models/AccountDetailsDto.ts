/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountCreditDetailsDto } from './AccountCreditDetailsDto';
import type { AccountSettingDto } from './AccountSettingDto';
import type { CompanyBrandDto } from './CompanyBrandDto';
import type { CustomMenuLinkDto } from './CustomMenuLinkDto';
import type { DomoDashboardDto } from './DomoDashboardDto';
import type { EulDefaultsFieldDto } from './EulDefaultsFieldDto';
import type { InvoiceAgingDto } from './InvoiceAgingDto';
import type { MetaDataFieldResponseDto } from './MetaDataFieldResponseDto';

export type AccountDetailsDto = {
  /**
   * Response Only
   */
  _labels?: Record<string, string>;
  /**
   * Response Only
   */
  _links?: Record<string, Array<string>>;
  accountCode?: string;
  accountId?: number;
  accountType?: string;
  address?: string;
  address2?: string;
  allowChatSupport?: boolean;
  allowCreditCardPayments?: boolean;
  allowInvoicePaymentByCreditCard?: boolean;
  allowPassthroughFreight?: boolean;
  allowShippingFee?: boolean;
  allowStockingOrders?: boolean;
  allowTermsPayments?: boolean;
  allowedShipmentMethods?: Array<string>;
  brand?: CompanyBrandDto;
  buildLinks?: Record<string, Array<string>>;
  cell?: string;
  city?: string;
  companyName?: string;
  createdDate?: string;
  creditDetails?: AccountCreditDetailsDto;
  customMenuLink?: CustomMenuLinkDto;
  customerClass?: string;
  defaultNewShippingAddressesToActive?: boolean;
  defaultOrdersToRepHold?: boolean;
  defaultQuoteExpirationDays?: number;
  defaultShipmentMethod?: string;
  docContactEmail?: string;
  domoDashboards?: Array<DomoDashboardDto>;
  eulDefaultFieldTypes?: Array<EulDefaultsFieldDto>;
  eulDefaults?: Record<string, Record<string, any>>;
  fax?: string;
  includeAuthenticatedLinkInOrderEmails?: boolean;
  industry?: string;
  invoiceAging?: InvoiceAgingDto;
  invoiceDeliveryMethod?: string;
  landingPageContentUrl?: string;
  leasingAccount?: boolean;
  liveAgentButtonId?: string;
  logoUrl?: string;
  metaDataFields?: MetaDataFieldResponseDto;
  modifiedDate?: string;
  parentAccountId?: string;
  physicalAddress?: string;
  physicalAddress2?: string;
  physicalCity?: string;
  physicalState?: string;
  physicalZip?: string;
  preferredInterface?: string;
  repEmail?: string;
  repId?: string;
  repTeamEmail?: string;
  salesforceId?: string;
  settings?: AccountSettingDto;
  showFeeSummaryOnInvoices?: boolean;
  showFeeSummaryOnOrdersQuotesAndPars?: boolean;
  showPriceOnOrderConfirmations?: boolean;
  showShippingOnOrders?: boolean;
  showShippingOnQuotes?: boolean;
  showSignatureLineOnQuotes?: boolean;
  showTaxOnOrders?: boolean;
  showTaxOnQuotes?: boolean;
  ssoEnabled?: boolean;
  state?: string;
  useLegacyXmlPoProcessor?: boolean;
  zip?: string;
};

