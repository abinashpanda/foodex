/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ENUM_ORDERSTATUS_STATUS } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MarkOrderReceived
// ====================================================

export interface MarkOrderReceived_createOrderStatus_orderStatus {
  __typename: "OrderStatus";
  id: string;
  status: ENUM_ORDERSTATUS_STATUS;
  createdAt: any;
}

export interface MarkOrderReceived_createOrderStatus {
  __typename: "createOrderStatusPayload";
  orderStatus: MarkOrderReceived_createOrderStatus_orderStatus | null;
}

export interface MarkOrderReceived {
  createOrderStatus: MarkOrderReceived_createOrderStatus | null;
}

export interface MarkOrderReceivedVariables {
  orderId: string;
}
