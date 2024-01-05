// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getCusById GET /api/customer/get */
export async function getCusByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCusByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCustomerVO_>('/api/customer/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/customer/get/login */
export async function getLoginUserUsingGET1(options?: { [key: string]: any }) {
  return request<API.BaseResponseCustomerVO_>('/api/customer/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listCusMyOrder GET /api/customer/listMy */
export async function listCusMyOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listCusMyOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrdersVO_>('/api/customer/listMy', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login POST /api/customer/login */
export async function loginUsingPOST1(
  body: API.CustomerLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/customer/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
