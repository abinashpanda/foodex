/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_DELIVERYADDRESS_TYPE, ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrdersForRestaurant
// ====================================================

export interface OrdersForRestaurant_orders_customer {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface OrdersForRestaurant_orders_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface OrdersForRestaurant_orders_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (OrdersForRestaurant_orders_restaurant_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface OrdersForRestaurant_orders_deliveryAddress {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}

export interface OrdersForRestaurant_orders_statuses {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}

export interface OrdersForRestaurant_orders {
  __typename: "Order";
  id: string;
  price: number;
  customer: OrdersForRestaurant_orders_customer | null;
  restaurant: OrdersForRestaurant_orders_restaurant | null;
  deliveryAddress: OrdersForRestaurant_orders_deliveryAddress | null;
  statuses: (OrdersForRestaurant_orders_statuses | null)[] | null;
  billInfo: any;
}

export interface OrdersForRestaurant {
  orders: (OrdersForRestaurant_orders | null)[] | null;
}

export interface OrdersForRestaurantVariables {
  restaurantId: string;
}
