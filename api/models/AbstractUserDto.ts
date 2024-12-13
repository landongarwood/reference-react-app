/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessAccountDto } from './AccessAccountDto';
import type { ProfileDto } from './ProfileDto';
import type { PunchoutAliasDto } from './PunchoutAliasDto';

export type AbstractUserDto = {
  _labels?: Record<string, string>;
  /**
   * Response Only
   */
  _links?: Record<string, Array<string>>;
  accessAccounts?: Array<AccessAccountDto>;
  accessAllBillToIds?: boolean;
  accessBillToIds?: Array<number>;
  accountActive: boolean;
  accountCode: string;
  accountId: number;
  accountName: string;
  address1: string;
  address2: string;
  approverType: string;
  authenticatedLinkAllowedIPs: Array<string>;
  buildLinks?: Record<string, Array<string>>;
  categoryGroupIds: Array<number>;
  city: string;
  defaultShipno: number;
  division: string;
  email: string;
  fax: string;
  firstName: string;
  homePageUrl: string;
  isAdmin: boolean;
  isSalesAccountExecutive: boolean;
  isSalesDirector: boolean;
  isSalesSupport: boolean;
  isSalesVp: boolean;
  lastLoginDateTime: string;
  lastName: string;
  lastOrderDateTime: string;
  lastQuoteDateTime: string;
  mobilePhone: string;
  phone: string;
  phoneExt: string;
  preferredInterface: string;
  profile: ProfileDto;
  punchoutAlias?: PunchoutAliasDto;
  restrictCreditCardPayments: boolean;
  restrictTermsPayments: boolean;
  salesRepUser?: boolean;
  sharedUser?: boolean;
  state: string;
  superCsr: boolean;
  type?: string;
  userClass: string;
  userCode: string;
  userId: number;
  userTitle: string;
  userType: string;
  zip: string;
};

