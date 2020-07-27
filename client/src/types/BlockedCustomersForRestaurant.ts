/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlockedCustomersForRestaurant
// ====================================================

export interface BlockedCustomersForRestaurant_blockedUsers_user {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface BlockedCustomersForRestaurant_blockedUsers {
  __typename: "BlockedUser";
  id: string;
  user: BlockedCustomersForRestaurant_blockedUsers_user | null;
}

export interface BlockedCustomersForRestaurant {
  blockedUsers: (BlockedCustomersForRestaurant_blockedUsers | null)[] | null;
}

export interface BlockedCustomersForRestaurantVariables {
  restaurantId: string;
}
