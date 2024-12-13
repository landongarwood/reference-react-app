/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RestCollection_AMI_ } from '../models/RestCollection_AMI_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AmiResourceService {

  /**
   * Get AMI's list
   * Get an AMI's list
   * @param criteria criteria
   * @param page page
   * @param returnAllLabels returnAllLabels
   * @param returnPagination returnPagination
   * @param returnSavedViews returnSavedViews
   * @param size size
   * @param useDefaultView useDefaultView
   * @returns RestCollection_AMI_ Success
   * @throws ApiError
   */
  public static listUsingGet1(
    criteria: string = '{}',
    page: number = 1,
    returnAllLabels: boolean = false,
    returnPagination: boolean = true,
    returnSavedViews: boolean = true,
    size: number = 50,
    useDefaultView: boolean = false,
  ): CancelablePromise<RestCollection_AMI_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/listing/amis',
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
        403: `You are not authorized to access this account.`,
        404: `AMI list not found.`,
        500: `Internal Error retrieving AMI list`,
      },
    });
  }

}
