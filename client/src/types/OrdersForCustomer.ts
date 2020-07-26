/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_DELIVERYADDRESS_TYPE, ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrdersForCustomer
// ====================================================

export interface OrdersForCustomer_orders_customer {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface OrdersForCustomer_orders_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface OrdersForCustomer_orders_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (OrdersForCustomer_orders_restaurant_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface OrdersForCustomer_orders_deliveryAddress {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}

export interface OrdersForCustomer_orders_statuses {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}

export interface OrdersForCustomer_orders {
  __typename: "Order";
  id: string;
  price: number;
  customer: OrdersForCustomer_orders_customer | null;
  restaurant: OrdersForCustomer_orders_restaurant | null;
  deliveryAddress: OrdersForCustomer_orders_deliveryAddress | null;
  statuses: (OrdersForCustomer_orders_statuses | null)[] | null;
  billInfo: any;
}

export interface OrdersForCustomer {
  orders: (OrdersForCustomer_orders | null)[] | null;
}

export interface OrdersForCustomerVariables {
  customerId: string;
}
