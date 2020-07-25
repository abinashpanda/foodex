/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_DELIVERYADDRESS_TYPE } from "./globalTypes";

// ====================================================
// GraphQL query operation: AddressesForUser
// ====================================================

export interface AddressesForUser_deliveryAddresses {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}

export interface AddressesForUser {
  deliveryAddresses: (AddressesForUser_deliveryAddresses | null)[] | null;
}

export interface AddressesForUserVariables {
  userId: string;
}
