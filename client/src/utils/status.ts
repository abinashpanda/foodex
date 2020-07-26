import { capitalize } from 'lodash-es'
import { ENUM_ORDERSTATUS_STATUS } from 'types/globalTypes'

export const getStatusName = (status: string) => {
  return status
    .split('_')
    .map((val) => capitalize(val))
    .join(' ')
}

export const statusColors = {
  PLACED: 'blue-500',
  CANCELLED: 'red-500',
  PROCESSING: 'yellow-400',
  IN_ROUTE: 'green-500',
  DELIVERED: 'green-500',
  RECEIVED: 'green-500',
}

export const getNextStage = (status: ENUM_ORDERSTATUS_STATUS) => {
  if (status === 'PLACED') {
    return {
      status: ENUM_ORDERSTATUS_STATUS.PROCESSING,
      label: 'Processing Order',
    }
  }

  if (status === 'PROCESSING') {
    return {
      status: ENUM_ORDERSTATUS_STATUS.IN_ROUTE,
      label: 'Order out for Delivery',
    }
  }

  if (status === 'IN_ROUTE') {
    return {
      status: ENUM_ORDERSTATUS_STATUS.DELIVERED,
      label: 'Order Delivered',
    }
  }

  return undefined
}

export const getStatusImage = (status: ENUM_ORDERSTATUS_STATUS) => {
  switch (status) {
    case ENUM_ORDERSTATUS_STATUS.PLACED: {
      return require('../images/order.svg')
    }

    case ENUM_ORDERSTATUS_STATUS.CANCELLED: {
      return require('../images/cancelled.svg')
    }

    case ENUM_ORDERSTATUS_STATUS.PROCESSING: {
      return require('../images/processing.svg')
    }

    case ENUM_ORDERSTATUS_STATUS.IN_ROUTE: {
      return require('../images/food-delivery.svg')
    }

    case ENUM_ORDERSTATUS_STATUS.DELIVERED: {
      return require('../images/delivered.svg')
    }

    case ENUM_ORDERSTATUS_STATUS.RECEIVED: {
      return require('../images/received.svg')
    }

    default: {
      return undefined
    }
  }
}
