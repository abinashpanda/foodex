/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_DELIVERYADDRESS_TYPE, ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderInfo
// ====================================================

export interface OrderInfo_customer {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface OrderInfo_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface OrderInfo_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (OrderInfo_restaurant_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface OrderInfo_deliveryAddress {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}

export interface OrderInfo_statuses {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}

export interface OrderInfo {
  __typename: "Order";
  id: string;
  price: number;
  customer: OrderInfo_customer | null;
  restaurant: OrderInfo_restaurant | null;
  deliveryAddress: OrderInfo_deliveryAddress | null;
  statuses: (OrderInfo_statuses | null)[] | null;
  billInfo: any;
}
