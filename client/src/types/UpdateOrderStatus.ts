/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateOrderStatus
// ====================================================

export interface UpdateOrderStatus_createOrderStatus_orderStatus {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}

export interface UpdateOrderStatus_createOrderStatus {
  __typename: "createOrderStatusPayload";
  orderStatus: UpdateOrderStatus_createOrderStatus_orderStatus | null;
}

export interface UpdateOrderStatus {
  createOrderStatus: UpdateOrderStatus_createOrderStatus | null;
}

export interface UpdateOrderStatusVariables {
  orderId: string;
  status: ENUM_ORDERSTATUS_STATUS;
}
