// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** addAddress POST /api/address/add */
export async function addAddressUsingPOST(
  body: API.AddressAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/address/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getAddressById GET /api/address/get */
export async function getAddressByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAddressByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseAddress_>('/api/address/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listAddress GET /api/address/list */
export async function listAddressUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAddressUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListAddressVO_>('/api/address/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateAddress POST /api/address/update */
export async function updateAddressUsingPOST(
  body: API.AddressUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/address/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteAddressById DELETE /api/address/update */
export async function deleteAddressByIdUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAddressByIdUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/address/update', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
