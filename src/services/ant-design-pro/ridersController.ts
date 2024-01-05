// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getRiderById GET /api/rider/get */
export async function getRiderByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRiderByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseRiderVO_>('/api/rider/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/rider/get/login */
export async function getLoginUserUsingGET2(options?: { [key: string]: any }) {
  return request<API.BaseResponseRiderVO_>('/api/rider/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listRiderMyOrder GET /api/rider/listMy */
export async function listRiderMyOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listRiderMyOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrdersVO_>('/api/rider/listMy', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login POST /api/rider/login */
export async function loginUsingPOST2(
  body: API.RiderLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/rider/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
