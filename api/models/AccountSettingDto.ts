/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountMessagesDto } from './AccountMessagesDto';
import type { AppleDepDto } from './AppleDepDto';
import type { PunchoutCustomExtrinsics } from './PunchoutCustomExtrinsics';
import type { PunchoutInstanceDto } from './PunchoutInstanceDto';
import type { PunchoutsSettingDto } from './PunchoutsSettingDto';
import type { PunchoutUrls } from './PunchoutUrls';

export type AccountSettingDto = {
  appleDep?: AppleDepDto;
  messages?: AccountMessagesDto;
  orderConfirmationEmails?: Array<string>;
  punchoutCustomExtrinsics?: Array<PunchoutCustomExtrinsics>;
  punchoutErpType?: string;
  punchoutFormat?: string;
  punchoutInstances?: Array<PunchoutInstanceDto>;
  punchoutUrls?: PunchoutUrls;
  punchouts?: Array<PunchoutsSettingDto>;
  quoteConfirmationEmails?: Array<string>;
  standardConfirmationEmails?: Array<string>;
};

