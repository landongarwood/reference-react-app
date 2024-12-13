/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Links } from './Links';

export type BillingAddressPo = {
  account: string;
  accountName: string;
  address: string;
  address2: string;
  billNo: number;
  city?: string;
  companyName: string;
  createdOn: string;
  ext?: string;
  links?: Links;
  modifiedOn?: string;
  phone: string;
  salesDirector: string;
  salesRep: string;
  state: string;
  status: BillingAddressPo.status;
  zip: string;
};

export namespace BillingAddressPo {

  export enum status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
  }


}

