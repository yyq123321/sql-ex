// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** addFoods POST /api/food/add */
export async function addFoodsUsingPOST(
  body: API.FoodAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/food/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getFoodsById GET /api/food/get */
export async function getFoodsByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getFoodsByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseFoods_>('/api/food/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listFoods GET /api/food/list */
export async function listFoodsUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listFoodsUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListFoodsVO_>('/api/food/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listFoodOrder GET /api/food/listFoodOrder */
export async function listFoodOrderUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListFoodOrderSummaryDTO_>('/api/food/listFoodOrder', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateFoods POST /api/food/update */
export async function updateFoodsUsingPOST(
  body: API.FoodsUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/food/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
