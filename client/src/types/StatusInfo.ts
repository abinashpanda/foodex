/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL fragment: StatusInfo
// ====================================================

export interface StatusInfo {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}
