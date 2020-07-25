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

export interface OrdersForCustomer_orders_orderItems_meal_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface OrdersForCustomer_orders_orderItems_meal_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface OrdersForCustomer_orders_orderItems_meal {
  __typename: "Meal";
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: OrdersForCustomer_orders_orderItems_meal_image | null;
  restaurant: OrdersForCustomer_orders_orderItems_meal_restaurant | null;
}

export interface OrdersForCustomer_orders_orderItems {
  __typename: "OrderItem";
  meal: OrdersForCustomer_orders_orderItems_meal | null;
  quantity: number;
}

export interface OrdersForCustomer_orders_statuses {
  __typename: "OrderStatus";
  id: string;
  createdAt: any;
  status: ENUM_ORDERSTATUS_STATUS;
}

export interface OrdersForCustomer_orders {
  __typename: "Order";
  id: string;
  customer: OrdersForCustomer_orders_customer | null;
  restaurant: OrdersForCustomer_orders_restaurant | null;
  deliveryAddress: OrdersForCustomer_orders_deliveryAddress | null;
  orderItems: (OrdersForCustomer_orders_orderItems | null)[] | null;
  statuses: (OrdersForCustomer_orders_statuses | null)[] | null;
}

export interface OrdersForCustomer {
  orders: (OrdersForCustomer_orders | null)[] | null;
}

export interface OrdersForCustomerVariables {
  customerId: string;
}
