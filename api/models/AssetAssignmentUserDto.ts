/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConditionAssessmentDto } from './ConditionAssessmentDto';
import type { DisposalDetailsDto } from './DisposalDetailsDto';

export type AssetAssignmentUserDto = {
  accountCode?: string;
  address?: string;
  address2?: string;
  assetAssignmentUserId?: number;
  assignedByUserId?: number;
  assignedByUserName?: string;
  cell?: string;
  city?: string;
  conditionAssessments?: Array<ConditionAssessmentDto>;
  createdBy?: string;
  createdOnDateTime?: string;
  customerCode?: string;
  customerName?: string;
  disposalDetails?: DisposalDetailsDto;
  email?: string;
  modifiedBy?: string;
  modifiedOnDateTime?: string;
  phone?: string;
  state?: string;
  statusId?: number;
  title?: string;
  zip?: string;
};

