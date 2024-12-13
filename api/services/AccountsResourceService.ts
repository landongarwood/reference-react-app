/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountApproverGroupDto } from '../models/AccountApproverGroupDto';
import type { AccountDetailsDto } from '../models/AccountDetailsDto';
import type { AccountFreightSettingsPatchRequestDto } from '../models/AccountFreightSettingsPatchRequestDto';
import type { AccountFreightSettingsResponseDto } from '../models/AccountFreightSettingsResponseDto';
import type { AccountPatchRequestDto } from '../models/AccountPatchRequestDto';
import type { AccountSalesSummaryResponseDto } from '../models/AccountSalesSummaryResponseDto';
import type { AccountSuggestResponseDto } from '../models/AccountSuggestResponseDto';
import type { Client } from '../models/Client';
import type { CustomLabelsResponseDto } from '../models/CustomLabelsResponseDto';
import type { GenericAccountDetailsDto } from '../models/GenericAccountDetailsDto';
import type { RestCollection_AccountSolrDto_ } from '../models/RestCollection_AccountSolrDto_';
import type { Salesrep } from '../models/Salesrep';
import type { StateTaxExemptionsResponseDto } from '../models/StateTaxExemptionsResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AccountsResourceService {

  /**
   * Find account
   * Find account
   * @param accountCode accountCode
   * @returns AccountDetailsDto Success
   * @throws ApiError
   */
  public static getAccountDetailsUsingGet(
    accountCode?: string,
  ): CancelablePromise<AccountDetailsDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account',
      query: {
        'accountCode': accountCode,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account details were not found`,
        500: `Internal Error Finding Account Details`,
      },
    });
  }

  /**
   * Account type-ahead suggest
   * Account type-ahead suggest
   * @param terms terms
   * @param limit limit
   * @param type type
   * @returns AccountSuggestResponseDto Success
   * @throws ApiError
   */
  public static getSuggestsUsingGet(
    terms: string,
    limit: number = 10,
    type: 'active' | 'all' = 'all',
  ): CancelablePromise<Array<AccountSuggestResponseDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/suggest',
      query: {
        'limit': limit,
        'terms': terms,
        'type': type,
      },
      errors: {
        400: `Invalid request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `There was an error getting the account suggestions`,
      },
    });
  }

  /**
   * Find account State Tax Exemption by account id
   * Find account State Tax Exemption by account id
   * @param accountId accountId
   * @returns StateTaxExemptionsResponseDto Success
   * @throws ApiError
   */
  public static getTaxExemptStatesUsingGet(
    accountId?: number,
  ): CancelablePromise<Array<StateTaxExemptionsResponseDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/taxExemptStates',
      query: {
        'accountId': accountId,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `State Tax Exemptions Not Found`,
        500: `Internal Error Finding Account State Tax Exemption`,
      },
    });
  }

  /**
   * Find account by account code
   * Find account by account code
   * @param accountCode accountCode
   * @param clientId client_id
   * @param clientSecret client_secret
   * @returns GenericAccountDetailsDto Success
   * @throws ApiError
   */
  public static getAccountUsingGet(
    accountCode: string,
    clientId?: string,
    clientSecret?: string,
  ): CancelablePromise<GenericAccountDetailsDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/{accountCode}',
      path: {
        'accountCode': accountCode,
      },
      query: {
        'client_id': clientId,
        'client_secret': clientSecret,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account details were not found`,
        500: `Internal Error Finding Account Details`,
      },
    });
  }

  /**
   * Find account contact by account code
   * Find account contact by account code
   * @param accountCode accountCode
   * @returns Client Success
   * @throws ApiError
   */
  public static getAccountContactUsingGet(
    accountCode: string,
  ): CancelablePromise<Client> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/{accountCode}/contact',
      path: {
        'accountCode': accountCode,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Client data were not found`,
        500: `Internal Error Finding Account Contact`,
      },
    });
  }

  /**
   * Patch an Account
   * Patch an Account
   * @param accountId accountId
   * @param accountPatchRequestDto accountPatchRequestDto
   * @returns AccountDetailsDto Success
   * @throws ApiError
   */
  public static patchAccountUsingPatch(
    accountId: number,
    accountPatchRequestDto: AccountPatchRequestDto,
  ): CancelablePromise<AccountDetailsDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/service/rest/account/{accountId}',
      path: {
        'accountId': accountId,
      },
      body: accountPatchRequestDto,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account Not Found`,
        500: `Internal Error Patching Account`,
      },
    });
  }

  /**
   * Find account custom labels by account id
   * Find account custom labels by account id
   * @param accountId accountId
   * @returns CustomLabelsResponseDto Success
   * @throws ApiError
   */
  public static getAccountCustomLabelsUsingGet(
    accountId: number,
  ): CancelablePromise<Array<CustomLabelsResponseDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/{accountId}/customLabels',
      path: {
        'accountId': accountId,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account Id Not Found`,
        500: `Internal Error Finding Account Custom Labels`,
      },
    });
  }

  /**
   * Find account sales summary by account id
   * Find account sales summary by account id
   * @param accountId accountId
   * @param endDate endDate
   * @param startDate startDate
   * @returns AccountSalesSummaryResponseDto Success
   * @throws ApiError
   */
  public static getAccountSalesSummaryUsingGet(
    accountId: number,
    endDate: string,
    startDate: string,
  ): CancelablePromise<AccountSalesSummaryResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/{accountId}/salesSummary',
      path: {
        'accountId': accountId,
      },
      query: {
        'endDate': endDate,
        'startDate': startDate,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account Id Not Found`,
        500: `Internal Error Finding Account sales summary`,
      },
    });
  }

  /**
   * Get an Account Freight Settings
   * Get an Account Freight Settings
   * @param accountId accountId
   * @returns AccountFreightSettingsResponseDto Success
   * @throws ApiError
   */
  public static getAccountFreightSettingsUsingGet(
    accountId: number,
  ): CancelablePromise<AccountFreightSettingsResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/{accountId}/settings/freight',
      path: {
        'accountId': accountId,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account Not Found`,
        500: `Internal Error Getting Account Freight Settings`,
      },
    });
  }

  /**
   * Patch an Account Freight Settings
   * Patch an Account Freight Settings
   * @param accountId accountId
   * @param patchRequestDto patchRequestDto
   * @returns AccountFreightSettingsResponseDto Success
   * @throws ApiError
   */
  public static patchAccountFreightSettingsUsingPatch(
    accountId: number,
    patchRequestDto: AccountFreightSettingsPatchRequestDto,
  ): CancelablePromise<AccountFreightSettingsResponseDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/service/rest/account/{accountId}/settings/freight',
      path: {
        'accountId': accountId,
      },
      body: patchRequestDto,
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account Not Found`,
        500: `Internal Error Patching Account Freight Settings`,
      },
    });
  }

  /**
   * Find account credit details by account code
   * Find account credit details by account code
   * @param account account
   * @returns AccountDetailsDto Success
   * @throws ApiError
   */
  public static getAccountCreditUsingGet(
    account: string,
  ): CancelablePromise<AccountDetailsDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/{account}/credit',
      path: {
        'account': account,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account details were not found`,
        500: `Internal Error Finding Account Credit Details`,
      },
    });
  }

  /**
   * Find account sales rep by account code
   * Find account sales rep by account code
   * @param account account
   * @returns Salesrep Success
   * @throws ApiError
   */
  public static getAccountSalesrepUsingGet(
    account: string,
  ): CancelablePromise<Salesrep> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/account/{account}/salesrep',
      path: {
        'account': account,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Sales Rep was not found`,
        500: `Internal Error Finding Account Sales Rep`,
      },
    });
  }

  /**
   * Get account approver groups
   * Get account approver groups
   * @param accountId accountId
   * @returns AccountApproverGroupDto Success
   * @throws ApiError
   */
  public static getAccountApproverGroupsUsingGet(
    accountId?: number,
  ): CancelablePromise<Array<AccountApproverGroupDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/approverGroups',
      query: {
        'accountId': accountId,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account groups were not found`,
        500: `Internal Error Finding Account Details`,
      },
    });
  }

  /**
   * Account Listing.
   * AccountListing
   * @param criteria criteria
   * @param page page
   * @param returnAllLabels returnAllLabels
   * @param returnPagination returnPagination
   * @param returnSavedViews returnSavedViews
   * @param size size
   * @param useDefaultView useDefaultView
   * @returns RestCollection_AccountSolrDto_ Success
   * @throws ApiError
   */
  public static listUsingGet(
    criteria: string = '{}',
    page: number = 1,
    returnAllLabels: boolean = false,
    returnPagination: boolean = true,
    returnSavedViews: boolean = true,
    size: number = 50,
    useDefaultView: boolean = false,
  ): CancelablePromise<RestCollection_AccountSolrDto_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/listing/accounts',
      query: {
        'criteria': criteria,
        'page': page,
        'returnAllLabels': returnAllLabels,
        'returnPagination': returnPagination,
        'returnSavedViews': returnSavedViews,
        'size': size,
        'useDefaultView': useDefaultView,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Account listings were not found`,
        500: `Internal Error Finding Accounts`,
      },
    });
  }

}
