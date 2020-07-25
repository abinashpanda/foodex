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

export interface Order_order_orderItems_meal_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface Order_order_orderItems_meal_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface Order_order_orderItems_meal {
  __typename: "Meal";
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: Order_order_orderItems_meal_image | null;
  restaurant: Order_order_orderItems_meal_restaurant | null;
}

export interface Order_order_orderItems {
  __typename: "OrderItem";
  id: string;
  meal: Order_order_orderItems_meal | null;
  quantity: number;
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
  orderItems: (Order_order_orderItems | null)[] | null;
  statuses: (Order_order_statuses | null)[] | null;
}

export interface Order {
  order: Order_order | null;
}

export interface OrderVariables {
  orderId: string;
}
