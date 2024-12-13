/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetAssignmentDetailResponseDto } from './AssetAssignmentDetailResponseDto';

export type AssetAssignmentResponseDto = {
  assetAssignmentDetailsByAssetAssignmentId?: Array<AssetAssignmentDetailResponseDto>;
  assetAssignmentId?: number;
  assetTag?: string;
  createdBy?: string;
  createdOnDateTime?: string;
  invoiceNum?: number;
  macAddress?: string;
  modifiedBy?: string;
  modifiedOnDateTime?: string;
  sequence?: number;
  serialNumber?: string;
};

