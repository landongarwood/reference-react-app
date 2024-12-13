/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplecareDepActivationsLogDto } from '../models/ApplecareDepActivationsLogDto';
import type { AssetAssignmentResponseDto } from '../models/AssetAssignmentResponseDto';
import type { AssetAssignmentStatusDto } from '../models/AssetAssignmentStatusDto';
import type { AssetAssignmentUserDto } from '../models/AssetAssignmentUserDto';
import type { AssetResponseDto } from '../models/AssetResponseDto';
import type { AssetSolrDto } from '../models/AssetSolrDto';
import type { EntityModel_AssetSolrDto_ } from '../models/EntityModel_AssetSolrDto_';
import type { RestCollection_AssetSolrDto_ } from '../models/RestCollection_AssetSolrDto_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AssetsResourceService {

  /**
   * Get assets by look up parameters.
   * Get assets by look up parameters.
   * @param accountCode accountCode
   * @param assetTag assetTag
   * @param macAddress macAddress
   * @param serialNumber serialNumber
   * @param size size
   * @returns AssetSolrDto Success
   * @throws ApiError
   */
  public static getAssetByLookupParametersUsingGet(
    accountCode?: string,
    assetTag?: string,
    macAddress?: string,
    serialNumber?: string,
    size: number = 1,
  ): CancelablePromise<Array<AssetSolrDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/assets',
      query: {
        'accountCode': accountCode,
        'assetTag': assetTag,
        'macAddress': macAddress,
        'serialNumber': serialNumber,
        'size': size,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Asset was not found`,
        500: `Internal Error Finding Asset`,
      },
    });
  }

  /**
   * Delete Asset Assignment
   * Delete Asset Assignment
   * @param assignmentId assignmentId
   * @returns any Success
   * @throws ApiError
   */
  public static deleteAssetAssignmentUsingDelete(
    assignmentId: number,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/service/rest/assets/assignments/{assignmentId}',
      path: {
        'assignmentId': assignmentId,
      },
      errors: {
        400: `Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Asset Assignment Not Found`,
        500: `Internal Error Deleting Asset Assignment`,
      },
    });
  }

  /**
   * Assign asset status.
   * Assign asset status..
   * @param assetAssignmentStatus assetAssignmentStatus
   * @param assignmentId assignmentId
   * @returns AssetAssignmentResponseDto OK
   * @returns any Success
   * @throws ApiError
   */
  public static assignUsingPost(
    assetAssignmentStatus: AssetAssignmentStatusDto,
    assignmentId: number,
  ): CancelablePromise<AssetAssignmentResponseDto | any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/service/rest/assets/assignments/{assignmentId}/status',
      path: {
        'assignmentId': assignmentId,
      },
      body: assetAssignmentStatus,
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Asset was not found`,
        500: `Internal Error updating Asset`,
      },
    });
  }

  /**
   * Get Asset by serial number.
   * Get Asset by serial number.
   * @param serialNumber serialNumber
   * @returns AssetResponseDto Success
   * @throws ApiError
   */
  public static getAssetBySerialNumberUsingGet(
    serialNumber: string,
  ): CancelablePromise<AssetResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/assets/serialNumber/{serialNumber}',
      path: {
        'serialNumber': serialNumber,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Apple care log was not found`,
        500: `Internal Error Finding Asset`,
      },
    });
  }

  /**
   * Get Applecare log by serial number.
   * Get apple care activation logs by serial number.
   * @param serialNumber serialNumber
   * @returns ApplecareDepActivationsLogDto Success
   * @throws ApiError
   */
  public static getApplecareDepLogUsingGet(
    serialNumber: string,
  ): CancelablePromise<Array<ApplecareDepActivationsLogDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/assets/serialNumber/{serialNumber}/appleDepLog',
      path: {
        'serialNumber': serialNumber,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Apple care log was not found`,
        500: `Internal Error Finding Apple care log`,
      },
    });
  }

  /**
   * Get assets by asset id.
   * Get assets by asset id.
   * @param assetId assetId
   * @param expand expand
   * @returns EntityModel_AssetSolrDto_ Success
   * @throws ApiError
   */
  public static getAssetByAssetIdUsingGet(
    assetId: string,
    expand?: 'productDetails',
  ): CancelablePromise<EntityModel_AssetSolrDto_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/assets/{assetId}',
      path: {
        'assetId': assetId,
      },
      query: {
        'expand': expand,
      },
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Asset was not found`,
        500: `Internal Error Finding Asset`,
      },
    });
  }

  /**
   * Update asset assign user.
   * Update asset assign user.
   * @param assetAssignmentUser assetAssignmentUser
   * @param assetId assetId
   * @returns AssetSolrDto Success
   * @returns any Created
   * @throws ApiError
   */
  public static updateAssignedUserUsingPost(
    assetAssignmentUser: AssetAssignmentUserDto,
    assetId: string,
  ): CancelablePromise<AssetSolrDto | any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/service/rest/assets/{assetId}',
      path: {
        'assetId': assetId,
      },
      body: assetAssignmentUser,
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Asset was not found`,
        500: `Internal Error updating Asset`,
      },
    });
  }

  /**
   * Update asset assign user.
   * Update asset assign user.
   * @param assetAssignmentUser assetAssignmentUser
   * @param assetId assetId
   * @returns AssetSolrDto Success
   * @throws ApiError
   */
  public static updateAssignedUserUsingPatch(
    assetAssignmentUser: AssetAssignmentUserDto,
    assetId: string,
  ): CancelablePromise<AssetSolrDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/service/rest/assets/{assetId}',
      path: {
        'assetId': assetId,
      },
      body: assetAssignmentUser,
      errors: {
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Asset was not found`,
        500: `Internal Error updating Asset`,
      },
    });
  }

  /**
   * Get assets
   * Get assets
   * @param criteria criteria
   * @param page page
   * @param returnAllLabels returnAllLabels
   * @param returnPagination returnPagination
   * @param returnSavedViews returnSavedViews
   * @param size size
   * @param useDefaultView useDefaultView
   * @returns RestCollection_AssetSolrDto_ Success
   * @throws ApiError
   */
  public static listUsingGet2(
    criteria: string = '{}',
    page: number = 1,
    returnAllLabels: boolean = false,
    returnPagination: boolean = true,
    returnSavedViews: boolean = true,
    size: number = 50,
    useDefaultView: boolean = false,
  ): CancelablePromise<RestCollection_AssetSolrDto_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/listing/assets',
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
        404: `Assets were not found`,
        500: `Internal Error Finding Assets`,
      },
    });
  }

}
