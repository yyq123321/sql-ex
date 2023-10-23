// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** cancelOrder POST /api/order/cancel */
export async function cancelOrderUsingPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelOrderUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/order/cancel', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** createOrder POST /api/order/create */
export async function createOrderUsingPOST(
  body: API.OrderCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrderVO_>('/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getOrder GET /api/order/get */
export async function getOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrderVO_>('/api/order/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listPageOrder GET /api/order/list */
export async function listPageOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listPageOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageOrderVO_>('/api/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** callbackOrder POST /api/order/pay/notify */
export async function callbackOrderUsingPOST(body: string, options?: { [key: string]: any }) {
  return request<string>('/api/order/pay/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
