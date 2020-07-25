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

export interface PlaceOrder_placeOrder_orderItems_meal_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface PlaceOrder_placeOrder_orderItems_meal_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface PlaceOrder_placeOrder_orderItems_meal {
  __typename: "Meal";
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: PlaceOrder_placeOrder_orderItems_meal_image | null;
  restaurant: PlaceOrder_placeOrder_orderItems_meal_restaurant | null;
}

export interface PlaceOrder_placeOrder_orderItems {
  __typename: "OrderItem";
  id: string;
  meal: PlaceOrder_placeOrder_orderItems_meal | null;
  quantity: number;
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
  orderItems: (PlaceOrder_placeOrder_orderItems | null)[] | null;
  statuses: (PlaceOrder_placeOrder_statuses | null)[] | null;
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
}
