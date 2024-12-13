/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountsPayableContact } from './AccountsPayableContact';

export type BillToRequestDto = {
  accountsPayableContact: AccountsPayableContact;
  address?: string;
  address2?: string;
  attention?: string;
  city?: string;
  companyName?: string;
  extension?: string;
  invoiceEmail?: string;
  state: string;
  telephone: string;
  zip?: string;
};

