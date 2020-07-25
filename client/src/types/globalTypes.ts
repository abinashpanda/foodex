/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ENUM_DELIVERYADDRESS_TYPE {
  HOME = "HOME",
  OFFICE = "OFFICE",
  OTHER = "OTHER",
}

export enum ENUM_ORDERSTATUS_STATUS {
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
  IN_ROUTE = "IN_ROUTE",
  PLACED = "PLACED",
  PROCESSING = "PROCESSING",
  RECEIVED = "RECEIVED",
}

export interface OrderMealInput {
  meal: string;
  quantity: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
