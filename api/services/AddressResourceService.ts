/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbstractShipToDto } from '../models/AbstractShipToDto';
import type { AddressPatchRequestDto } from '../models/AddressPatchRequestDto';
import type { AddressRequestDto } from '../models/AddressRequestDto';
import type { AddressResponseDto } from '../models/AddressResponseDto';
import type { BillToRequestDto } from '../models/BillToRequestDto';
import type { BillToResponseDto } from '../models/BillToResponseDto';
import type { LocalityDto } from '../models/LocalityDto';
import type { RestCollection_BillingAddressPo_ } from '../models/RestCollection_BillingAddressPo_';
import type { ShippingAddressRequestDto } from '../models/ShippingAddressRequestDto';
import type { ShipRepToRequestDto } from '../models/ShipRepToRequestDto';
import type { ShipToResponseDto } from '../models/ShipToResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AddressResourceService {

  /**
   * Create an Address
   * Create an Address
   * @param addressRequestDto addressRequestDto
   * @returns AddressResponseDto Created
   * @throws ApiError
   */
  public static createAddressUsingPost(
    addressRequestDto: AddressRequestDto,
  ): CancelablePromise<AddressResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/service/rest/address',
      body: addressRequestDto,
      errors: {
        400: `Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Not Found`,
        409: `The address already exists`,
        500: `Internal Error Creating Address`,
        503: `The validation service is unavailable`,
      },
    });
  }

  /**
   * Create a Billing Address
   * Create a Billing Address
   * @param accountId accountId
   * @param billToRequestDto billToRequestDto
   * @returns BillToResponseDto Created
   * @throws ApiError
   */
  public static createBillingAddressUsingPost(
    accountId: number,
    billToRequestDto: BillToRequestDto,
  ): CancelablePromise<BillToResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/service/rest/address/billing',
      query: {
        'accountId': accountId,
      },
      body: billToRequestDto,
      errors: {
        400: `Billing Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Not Found`,
        409: `The address already exists`,
        500: `Internal Error Creating Billing Address`,
      },
    });
  }

  /**
   * Validate a Billing Address
   * Validate a Billing Address
   * @param accountId accountId
   * @param billToRequestDto billToRequestDto
   * @returns any Success
   * @throws ApiError
   */
  public static validateBillingAddressUsingPost(
    accountId: number,
    billToRequestDto: BillToRequestDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/service/rest/address/billing/validation',
      query: {
        'accountId': accountId,
      },
      body: billToRequestDto,
      errors: {
        400: `Billing Address Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        500: `Internal Error Validating Billing Address`,
      },
    });
  }

  /**
   * Get a Billing Address by billToId
   * Get a Billing Address by billToId
   * @param billToId billToId
   * @param accountCode accountCode
   * @returns BillToResponseDto Success
   * @throws ApiError
   */
  public static getBillingAddressByIdAndAccountUsingGet(
    billToId: number,
    accountCode?: string,
  ): CancelablePromise<BillToResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/address/billing/{billToId}',
      path: {
        'billToId': billToId,
      },
      query: {
        'accountCode': accountCode,
      },
      errors: {
        400: `Billing Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Billing Address Not Found`,
        500: `Internal Error Creating Billing Address`,
      },
    });
  }

  /**
   * Find All Billing Address
   * Find All Billing Address
   * @param criteria criteria
   * @param page page
   * @param returnAllLabels returnAllLabels
   * @param returnPagination returnPagination
   * @param returnSavedViews returnSavedViews
   * @param size size
   * @param useDefaultView useDefaultView
   * @returns RestCollection_BillingAddressPo_ Success
   * @throws ApiError
   */
  public static listingBillingAddressUsingGet(
    criteria: string = '{}',
    page: number = 1,
    returnAllLabels: boolean = false,
    returnPagination: boolean = true,
    returnSavedViews: boolean = true,
    size: number = 50,
    useDefaultView: boolean = false,
  ): CancelablePromise<RestCollection_BillingAddressPo_> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/address/listing/billingAddress',
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
        404: `Not Found`,
        500: `Internal Error Finding Billing Address`,
      },
    });
  }

  /**
   * Get City/County/State/Zip combination by zip code
   * Get City/County/State/Zip combination by zip code
   * @param zipCode zipCode
   * @returns LocalityDto Success
   * @throws ApiError
   */
  public static getLocalityByZipCodeUsingGet(
    zipCode: string,
  ): CancelablePromise<Array<LocalityDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/address/localities/{zipCode}',
      path: {
        'zipCode': zipCode,
      },
      errors: {
        400: `City/County/State/ZipBad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Not Found`,
        500: `Internal Error Getting City/County/State/Zip`,
      },
    });
  }

  /**
   * Get Shipping Addresses by account
   * Get Shipping Addresses by account
   * @param accountId accountId
   * @param limit limit
   * @param orderBy orderBy
   * @returns AbstractShipToDto Success
   * @throws ApiError
   */
  public static getShippingAddressesByAccountUsingGet(
    accountId?: number,
    limit: number = 1,
    orderBy: 'FIRST_USED' | 'LAST_USED' = 'LAST_USED',
  ): CancelablePromise<Array<AbstractShipToDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/address/shipping',
      query: {
        'accountId': accountId,
        'limit': limit,
        'orderBy': orderBy,
      },
      errors: {
        400: `Shipping Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Not Found`,
        500: `Internal Error Getting Shipping Address`,
      },
    });
  }

  /**
   * Create a Shipping Address
   * Create a Shipping Address
   * @param shipRepToRequestDto shipRepToRequestDto
   * @param accountCode accountCode
   * @returns ShipToResponseDto Created
   * @throws ApiError
   */
  public static createShippingAddressUsingPost(
    shipRepToRequestDto: ShipRepToRequestDto,
    accountCode?: string,
  ): CancelablePromise<ShipToResponseDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/service/rest/address/shipping',
      query: {
        'accountCode': accountCode,
      },
      body: shipRepToRequestDto,
      errors: {
        400: `Shipping Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Not Found`,
        409: `The address already exists`,
        500: `Internal Error Creating Shipping Address`,
        503: `The validation service is unavailable`,
      },
    });
  }

  /**
   * Get a Shipping Address by ShipToId and account
   * Get a Shipping Address by ShipToId and account
   * @param shipToId shipToId
   * @param accountCode accountCode
   * @returns AbstractShipToDto Success
   * @throws ApiError
   */
  public static getShippingAddressByShipToIdAndAccountUsingGet(
    shipToId: number,
    accountCode?: string,
  ): CancelablePromise<AbstractShipToDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/address/shipping/shipToId/{shipToId}',
      path: {
        'shipToId': shipToId,
      },
      query: {
        'accountCode': accountCode,
      },
      errors: {
        400: `Shipping Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `Shipping Address Not Found`,
        500: `Internal Error Creating Shipping Address`,
      },
    });
  }

  /**
   * Validate a Shipping Address
   * Validate a Shipping Address
   * @param shipToRequestDto shipToRequestDto
   * @param accountCode accountCode
   * @returns any Success
   * @throws ApiError
   */
  public static validateShippingAddressUsingPost(
    shipToRequestDto: ShipRepToRequestDto,
    accountCode?: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/service/rest/address/shipping/validation',
      query: {
        'accountCode': accountCode,
      },
      body: shipToRequestDto,
      errors: {
        400: `Shipping Address Bad Request`,
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
        409: `Shipping Address Already Exists`,
        500: `Internal Error Validating Shipping Address`,
      },
    });
  }

  /**
   * Update a Shipping Address
   * Update a Shipping Address
   * @param shippingAddressRequestDto shippingAddressRequestDto
   * @param shipToId shipToId
   * @param accountId accountId
   * @returns ShipToResponseDto Updated
   * @throws ApiError
   */
  public static updateShippingAddressUsingPatch(
    shippingAddressRequestDto: ShippingAddressRequestDto,
    shipToId: number,
    accountId?: number,
  ): CancelablePromise<ShipToResponseDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/service/rest/address/shipping/{shipToId}',
      path: {
        'shipToId': shipToId,
      },
      query: {
        'accountId': accountId,
      },
      body: shippingAddressRequestDto,
      errors: {
        400: `Shipping Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `The address was not found`,
        500: `Internal Error Updating Shipping Address`,
      },
    });
  }

  /**
   * Get an Address by id
   * Get an Address by Id
   * @param addressId addressId
   * @returns AddressResponseDto Ok
   * @throws ApiError
   */
  public static getAddressUsingGet(
    addressId: number,
  ): CancelablePromise<AddressResponseDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/service/rest/address/{addressId}',
      path: {
        'addressId': addressId,
      },
      errors: {
        400: `Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `The address was not found`,
        500: `Internal Error Getting Address`,
      },
    });
  }

  /**
   * Update an Address by id
   * Update an Address by Id
   * @param addressId addressId
   * @param patchDto patchDto
   * @returns AddressResponseDto Ok
   * @throws ApiError
   */
  public static updateAddressUsingPatch(
    addressId: number,
    patchDto: AddressPatchRequestDto,
  ): CancelablePromise<AddressResponseDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/service/rest/address/{addressId}',
      path: {
        'addressId': addressId,
      },
      body: patchDto,
      errors: {
        400: `Address Bad Request`,
        401: `Unauthorized`,
        403: `The user doesn't have the right privilege for this request`,
        404: `The address was not found`,
        500: `Internal Error Updating Address`,
      },
    });
  }

}
