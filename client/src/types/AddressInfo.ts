/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_DELIVERYADDRESS_TYPE } from "./globalTypes";

// ====================================================
// GraphQL fragment: AddressInfo
// ====================================================

export interface AddressInfo {
  __typename: "DeliveryAddress";
  id: string;
  flat: string;
  landmark: string | null;
  street: string;
  type: ENUM_DELIVERYADDRESS_TYPE;
}
