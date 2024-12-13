/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BundleAccessoriesDto } from './BundleAccessoriesDto';
import type { PrimaryPackageDto } from './PrimaryPackageDto';

export type BundleDto = {
  /**
   * Response Only
   */
  _labels?: Record<string, string>;
  /**
   * Response Only
   */
  _links?: Record<string, Array<string>>;
  accessories: Array<BundleAccessoriesDto>;
  buildLinks?: Record<string, Array<string>>;
  createdDate?: string;
  createdTime?: string;
  description: string;
  favorite?: boolean;
  fixedPrice?: number;
  itemId?: number;
  minPrice?: number;
  modifiedBy?: string;
  modifiedOn?: string;
  pdfUrl: string;
  primaryPackage?: Array<PrimaryPackageDto>;
  primaryProductId?: number;
  shipLevel?: number;
  shippingFee?: number;
  standardId: number;
  title: string;
};

