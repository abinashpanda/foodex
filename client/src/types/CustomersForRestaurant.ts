/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomersForRestaurant
// ====================================================

export interface CustomersForRestaurant_orders_customer {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface CustomersForRestaurant_orders {
  __typename: "Order";
  id: string;
  customer: CustomersForRestaurant_orders_customer | null;
}

export interface CustomersForRestaurant {
  orders: (CustomersForRestaurant_orders | null)[] | null;
}

export interface CustomersForRestaurantVariables {
  restaurantId: string;
}
