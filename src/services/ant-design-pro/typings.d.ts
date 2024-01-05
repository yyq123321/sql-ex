declare namespace API {
  type Address = {
    consignee?: string;
    createTime?: string;
    customerId?: number;
    detail?: string;
    id?: number;
    phone?: string;
    sex?: number;
    updateTime?: string;
  };

  type AddressAddRequest = {
    consignee?: string;
    customerId?: number;
    detail?: string;
    phone?: string;
    sex?: number;
  };

  type AddressUpdateRequest = {
    consignee?: string;
    customerId?: number;
    detail?: string;
    id?: number;
    phone?: string;
    sex?: number;
  };

  type AddressVO = {
    consignee?: string;
    customerId?: number;
    detail?: string;
    id?: number;
    phone?: string;
    sex?: number;
  };

  type BaseResponseAddress_ = {
    code?: number;
    data?: Address;
    message?: string;
  };

  type BaseResponseBusinessVO_ = {
    code?: number;
    data?: BusinessVO;
    message?: string;
  };

  type BaseResponseCustomerVO_ = {
    code?: number;
    data?: CustomerVO;
    message?: string;
  };

  type BaseResponseFoods_ = {
    code?: number;
    data?: Foods;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListAddressVO_ = {
    code?: number;
    data?: ListAddressVO;
    message?: string;
  };

  type BaseResponseListBusinessesVO_ = {
    code?: number;
    data?: ListBusinessesVO;
    message?: string;
  };

  type BaseResponseListBusinessFoodOrderDTO_ = {
    code?: number;
    data?: BusinessFoodOrderDTO[];
    message?: string;
  };

  type BaseResponseListFoodOrderSummaryDTO_ = {
    code?: number;
    data?: FoodOrderSummaryDTO[];
    message?: string;
  };

  type BaseResponseListFoodsVO_ = {
    code?: number;
    data?: ListFoodsVO;
    message?: string;
  };

  type BaseResponseListOrderSummaryDTO_ = {
    code?: number;
    data?: OrderSummaryDTO[];
    message?: string;
  };

  type BaseResponseListOrdersVO_ = {
    code?: number;
    data?: ListOrdersVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseOrdersVO_ = {
    code?: number;
    data?: OrdersVO;
    message?: string;
  };

  type BaseResponseRiderVO_ = {
    code?: number;
    data?: RiderVO;
    message?: string;
  };

  type BusinessFoodOrderDTO = {
    businessId?: number;
    businessName?: string;
    foodName?: string;
    totalOrders?: number;
  };

  type BusinessLoginRequest = {
    password?: string;
    phone?: string;
  };

  type BusinessVO = {
    address?: string;
    id?: number;
    name?: string;
    phone?: string;
    photo?: string;
  };

  type CustomerLoginRequest = {
    password?: string;
    phone?: string;
  };

  type CustomerVO = {
    avatar?: string;
    id?: number;
    name?: string;
    phone?: string;
  };

  type deleteAddressByIdUsingDELETEParams = {
    /** id */
    id?: number;
  };

  type FoodAddRequest = {
    businessId?: number;
    category?: number;
    id?: number;
    name?: string;
    photo?: string;
    price?: number;
  };

  type FoodOrderSummaryDTO = {
    foodName?: string;
    totalOrders?: number;
  };

  type Foods = {
    businessId?: number;
    category?: number;
    createTime?: string;
    id?: number;
    name?: string;
    photo?: string;
    price?: number;
    updateTime?: string;
  };

  type FoodsUpdateRequest = {
    businessId?: number;
    category?: number;
    id?: number;
    name?: string;
    photo?: string;
    price?: number;
  };

  type FoodsVO = {
    businessId?: number;
    category?: number;
    id?: number;
    name?: string;
    photo?: string;
    price?: number;
  };

  type getAddressByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getBizByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getCusByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getFoodsByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getOrderByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getRiderByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type listAddressUsingGETParams = {
    current?: number;
    customerId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type ListAddressVO = {
    list?: Address[];
    total?: number;
  };

  type listBizMyOrderUsingGETParams = {
    businessId?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type listBizUsingGETParams = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type ListBusinessesVO = {
    list?: BusinessVO[];
    total?: number;
  };

  type listCusMyOrderUsingGETParams = {
    current?: number;
    customerId?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type listFoodsUsingGETParams = {
    businessId?: number;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type ListFoodsVO = {
    list?: Foods[];
    total?: number;
  };

  type listNoRiderOrderUsingGETParams = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type ListOrdersVO = {
    list?: OrdersVO[];
    total?: number;
  };

  type listOrderUsingGETParams = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type listRiderMyOrderUsingGETParams = {
    current?: number;
    pageSize?: number;
    riderId?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type OrderCreateRequest = {
    addressId?: number;
    businessId?: number;
    customerId?: number;
    foodId?: number;
    price?: number;
    remark?: string;
    riderId?: number;
  };

  type OrderSummaryDTO = {
    businessName?: string;
    foodName?: string;
    totalOrders?: number;
  };

  type OrdersUpdateRequest = {
    id?: number;
    riderId?: number;
    status?: number;
  };

  type OrdersVO = {
    address?: AddressVO;
    business?: BusinessVO;
    customer?: CustomerVO;
    food?: FoodsVO;
    id?: number;
    orderNum?: string;
    price?: number;
    remark?: string;
    rider?: RiderVO;
    status?: number;
  };

  type RiderLoginRequest = {
    password?: string;
    phone?: string;
  };

  type RiderVO = {
    avatar?: string;
    id?: number;
    name?: string;
    phone?: string;
  };
}
