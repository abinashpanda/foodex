/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_DELIVERYADDRESS_TYPE } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAddressForUser
// ====================================================

export interface CreateAddressForUser_createDeliveryAddress_deliveryAddress {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}

export interface CreateAddressForUser_createDeliveryAddress {
  __typename: "createDeliveryAddressPayload";
  deliveryAddress: CreateAddressForUser_createDeliveryAddress_deliveryAddress | null;
}

export interface CreateAddressForUser {
  createDeliveryAddress: CreateAddressForUser_createDeliveryAddress | null;
}

export interface CreateAddressForUserVariables {
  userId: string;
  flat: string;
  street: string;
  landmark?: string | null;
  type: ENUM_DELIVERYADDRESS_TYPE;
}
