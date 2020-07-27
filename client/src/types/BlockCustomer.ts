/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BlockCustomer
// ====================================================

export interface BlockCustomer_createBlockedUser_blockedUser_user {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface BlockCustomer_createBlockedUser_blockedUser {
  __typename: "BlockedUser";
  id: string;
  user: BlockCustomer_createBlockedUser_blockedUser_user | null;
}

export interface BlockCustomer_createBlockedUser {
  __typename: "createBlockedUserPayload";
  blockedUser: BlockCustomer_createBlockedUser_blockedUser | null;
}

export interface BlockCustomer {
  createBlockedUser: BlockCustomer_createBlockedUser | null;
}

export interface BlockCustomerVariables {
  restaurantId: string;
  customerId: string;
}
