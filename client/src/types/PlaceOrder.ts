/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderMealInput, ENUM_DELIVERYADDRESS_TYPE, ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: PlaceOrder
// ====================================================

export interface PlaceOrder_placeOrder_customer {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface PlaceOrder_placeOrder_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface PlaceOrder_placeOrder_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (PlaceOrder_placeOrder_restaurant_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface PlaceOrder_placeOrder_deliveryAddress {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}

export interface PlaceOrder_placeOrder_statuses {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}

export interface PlaceOrder_placeOrder {
  __typename: "Order";
  id: string;
  price: number;
  customer: PlaceOrder_placeOrder_customer | null;
  restaurant: PlaceOrder_placeOrder_restaurant | null;
  deliveryAddress: PlaceOrder_placeOrder_deliveryAddress | null;
  statuses: (PlaceOrder_placeOrder_statuses | null)[] | null;
  billInfo: any;
}

export interface PlaceOrder {
  placeOrder: PlaceOrder_placeOrder;
}

export interface PlaceOrderVariables {
  customerId: string;
  restaurantId: string;
  price: number;
  meals: OrderMealInput[];
  deliveryAddressId: string;
  billInfo: any;
}
