/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_DELIVERYADDRESS_TYPE, ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: Order
// ====================================================

export interface Order_order_customer {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface Order_order_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface Order_order_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (Order_order_restaurant_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface Order_order_deliveryAddress {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}

export interface Order_order_statuses {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}

export interface Order_order {
  __typename: "Order";
  id: string;
  price: number;
  customer: Order_order_customer | null;
  restaurant: Order_order_restaurant | null;
  deliveryAddress: Order_order_deliveryAddress | null;
  statuses: (Order_order_statuses | null)[] | null;
  billInfo: any;
}

export interface Order {
  order: Order_order | null;
}

export interface OrderVariables {
  orderId: string;
}
