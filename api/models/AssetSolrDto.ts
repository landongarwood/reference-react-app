/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApprovalXref } from './ApprovalXref';
import type { AssetAssignmentLineReceiptDto } from './AssetAssignmentLineReceiptDto';
import type { AssetAssignmentResponseDto } from './AssetAssignmentResponseDto';
import type { ConditionAssessmentDto } from './ConditionAssessmentDto';
import type { DisposalDetailsDto } from './DisposalDetailsDto';
import type { Links } from './Links';
import type { ProductLineResponseDto } from './ProductLineResponseDto';

export type AssetSolrDto = {
  ab?: string;
  accountCode?: string;
  accountName?: string;
  address?: string;
  address2?: string;
  agreement?: string;
  approvalXrefs?: Array<ApprovalXref>;
  assetAssignmentDetailId?: number;
  assetAssignmentId?: number;
  assetAssignmentLineReceipt?: AssetAssignmentLineReceiptDto;
  assetAssignmentStatusId?: number;
  assetAssignmentUserId?: number;
  assetLine?: AssetAssignmentResponseDto;
  assetTag?: string;
  assigned?: string;
  attention?: string;
  category?: string;
  categoryDetailed?: string;
  city?: string;
  cnetExpireDate?: string;
  companyName?: string;
  conditionAssessments?: Array<ConditionAssessmentDto>;
  confirmationEmail?: string;
  costCenter?: string;
  createdOn?: string;
  customerCode?: string;
  customerId?: string;
  customerPo?: string;
  description?: string;
  discontinued?: string;
  disposalDetails?: DisposalDetailsDto;
  eolDate?: string;
  expirationDate?: string;
  expirationType?: string;
  invoiceDate?: string;
  invoiceNumber?: number;
  largeImageUrl?: string;
  latestTrackingNumber?: string;
  license?: string;
  links?: Links;
  macaddress?: string;
  manufacturerProductId?: number;
  mfg?: string;
  mfgPart?: string;
  normalizedSerialNumber?: string;
  orderDate?: string;
  orderNumber?: number;
  orderSequence?: number;
  placedBy?: string;
  placedById?: string;
  price?: number;
  primaryImageUrl?: string;
  productDetails?: ProductLineResponseDto;
  project?: string;
  referenceNumber?: string;
  salesRepId?: string;
  salesRepName?: string;
  serialNumber?: string;
  shipDate?: string;
  shipper?: string;
  solrId?: any;
  state?: string;
  status?: string;
  summaryId?: string;
  suppCode?: string;
  suppPart?: string;
  supplierName?: string;
  trackingNumberCount?: number;
  trackingNumbers?: Array<string>;
  trackingUrl?: string;
  unspsc?: string;
  width400ImageUrl?: string;
  zip?: string;
};

