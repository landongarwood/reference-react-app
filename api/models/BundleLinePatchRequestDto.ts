/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DealDto } from './DealDto';
import type { EulPatchRequestDto } from './EulPatchRequestDto';

export type BundleLinePatchRequestDto = {
  componentType?: BundleLinePatchRequestDto.componentType;
  custom1?: string;
  custom2?: string;
  custom3?: string;
  custom4?: string;
  deal?: DealDto;
  description?: string;
  endUserLicenses: EulPatchRequestDto;
  inPrimaryPackage?: boolean;
  manufacturerName?: string;
  manufacturerPart?: string;
  mfgName?: string;
  mfgPart?: string;
  quantity?: number;
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
  sequence?: number;
  supplierProductId?: number;
  unitCost?: number;
  unitPrice?: number;
};

export namespace BundleLinePatchRequestDto {

  export enum componentType {
    COMPONENT_PICK_PACK_FEE_MASTER = 'Component|Pick-Pack|Fee|Master',
  }


}

