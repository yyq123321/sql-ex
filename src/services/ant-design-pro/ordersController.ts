// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** createOrder POST /api/order/create */
export async function createOrderUsingPOST(
  body: API.OrderCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/order/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getOrderById GET /api/order/get */
export async function getOrderByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrdersVO_>('/api/order/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listOrder GET /api/order/list */
export async function listOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrdersVO_>('/api/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listNoRiderOrder GET /api/order/listNoRider */
export async function listNoRiderOrderUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listNoRiderOrderUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListOrdersVO_>('/api/order/listNoRider', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listOrderSummary GET /api/order/listOrderSummary */
export async function listOrderSummaryUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListOrderSummaryDTO_>('/api/order/listOrderSummary', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateOrder POST /api/order/update */
export async function updateOrderUsingPOST(
  body: API.OrdersUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/order/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
