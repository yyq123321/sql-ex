// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getBizById GET /api/business/get */
export async function getBizByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getBizByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBusinessVO_>('/api/business/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/business/get/login */
export async function getLoginUserUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseBusinessVO_>('/api/business/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listBiz GET /api/business/list */
export async function listBizUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listBizUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListBusinessesVO_>('/api/business/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listBusinessFoodOrder GET /api/business/listBusinessFoodOrder */
export async function listBusinessFoodOrderUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListBusinessFoodOrderDTO_>('/api/business/listBusinessFoodOrder', {
    method: 'GET',
    ...(options || {}),
  });
}

/** listBizMyOrder GET /api/business/listMy */
export async function listBizMyOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listBizMyOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrdersVO_>('/api/business/listMy', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** login POST /api/business/login */
export async function loginUsingPOST(
  body: API.BusinessLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/business/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
