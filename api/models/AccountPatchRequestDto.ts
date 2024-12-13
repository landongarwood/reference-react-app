/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountSettingsRequestDto } from './AccountSettingsRequestDto';
import type { AppleDepDto } from './AppleDepDto';
import type { DomoDashboardPatchRequestDto } from './DomoDashboardPatchRequestDto';
import type { EulDefaultsPatchRequestDto } from './EulDefaultsPatchRequestDto';
import type { MetaDataFieldsPatchDto } from './MetaDataFieldsPatchDto';

export type AccountPatchRequestDto = {
  appleDep?: AppleDepDto;
  defaultQuoteExpirationDays?: number;
  domoDashboards?: Array<DomoDashboardPatchRequestDto>;
  eulDefaults?: EulDefaultsPatchRequestDto;
  industry?: string;
  liveAgentButtonId?: string;
  metaDataFields?: MetaDataFieldsPatchDto;
  repId?: number;
  salesforceId?: string;
  settings?: AccountSettingsRequestDto;
  useLegacyXmlPoProcessor?: string;
};

