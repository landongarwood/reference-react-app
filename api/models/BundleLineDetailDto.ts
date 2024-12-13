/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DealResponseDto } from './DealResponseDto';

export type BundleLineDetailDto = {
  /**
   * Response Only
   */
  _labels?: Record<string, string>;
  /**
   * Response Only
   */
  _links?: Record<string, Array<string>>;
  buildLinks?: Record<string, Array<string>>;
  /**
   * Response Only
   */
  bundleLineId?: number;
  componentType?: BundleLineDetailDto.componentType;
  custom1?: string;
  custom2?: string;
  custom3?: string;
  custom4?: string;
  /**
   * Response Only
   */
  deal?: DealResponseDto;
  /**
   * Response Only
   */
  description: string;
  /**
   * Response Only
   */
  endUserLicenseEligible?: boolean;
  /**
   * Response Only
   */
  endUserLicenses?: Record<string, string>;
  /**
   * Response Only
   */
  largeImageUrl?: string;
  manufacturerId?: number;
  /**
   * Response Only
   */
  manufacturerName: string;
  /**
   * Response Only
   */
  manufacturerPart: string;
  manufacturerProductId?: number;
  /**
   * Response Only
   */
  previousUnitPrice: number;
  /**
   * Response Only
   */
  primaryImageUrl?: string;
  /**
   * Response Only
   */
  quantity: number;
  /**
   * Response Only
   */
  quantityAvailable: number;
  quantityBundle1?: number;
  quantityBundle10?: number;
  quantityBundle2?: number;
  quantityBundle3?: number;
  quantityBundle4?: number;
  quantityBundle5?: number;
  quantityBundle6?: number;
  quantityBundle7?: number;
  quantityBundle8?: number;
  quantityBundle9?: number;
  /**
   * Response Only
   */
  sequence?: number;
  /**
   * Response Only
   */
  subtotal: number;
  /**
   * Response Only
   */
  supplierCode: string;
  /**
   * Response Only
   */
  supplierName: string;
  /**
   * Response Only
   */
  supplierPart: string;
  /**
   * Response Only
   */
  supplierProductId: number;
  /**
   * Response Only
   */
  unitCost?: number;
  /**
   * Response Only
   */
  unitPrice: number;
  /**
   * Response Only
   */
  width400ImageUrl?: string;
};

export namespace BundleLineDetailDto {

  export enum componentType {
    COMPONENT = 'Component',
    FEE = 'Fee',
    MASTER = 'Master',
    PICK_PACK = 'Pick-Pack',
  }


}

