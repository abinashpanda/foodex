/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnblockCustomer
// ====================================================

export interface UnblockCustomer_deleteBlockedUser_blockedUser_user {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface UnblockCustomer_deleteBlockedUser_blockedUser {
  __typename: "BlockedUser";
  id: string;
  user: UnblockCustomer_deleteBlockedUser_blockedUser_user | null;
}

export interface UnblockCustomer_deleteBlockedUser {
  __typename: "deleteBlockedUserPayload";
  blockedUser: UnblockCustomer_deleteBlockedUser_blockedUser | null;
}

export interface UnblockCustomer {
  deleteBlockedUser: UnblockCustomer_deleteBlockedUser | null;
}

export interface UnblockCustomerVariables {
  blockedUserId: string;
}
