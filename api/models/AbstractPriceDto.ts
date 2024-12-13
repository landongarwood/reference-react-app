/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CostDto } from './CostDto';
import type { MemberPriceDto } from './MemberPriceDto';

export type AbstractPriceDto = {
  accountCode?: string;
  bookPrice?: number;
  contractPrice?: number;
  cost?: CostDto;
  discount?: number;
  discountPercentage?: number;
  memberPrice?: MemberPriceDto;
  price?: number;
  priceType?: string;
  salesRepGp?: number;
  salesRepGpPercentage?: number;
};

