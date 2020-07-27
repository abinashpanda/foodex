/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlockedCustomerInfo
// ====================================================

export interface BlockedCustomerInfo_user {
  __typename: "UsersPermissionsUser";
  id: string;
  name: string;
}

export interface BlockedCustomerInfo {
  __typename: "BlockedUser";
  id: string;
  user: BlockedCustomerInfo_user | null;
}
