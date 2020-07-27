import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useMutation } from '@apollo/client'
import {
  BLOCKED_CUSTOMERS_FOR_RESTAURANT_QUERY,
  UNBLOCK_CUSTOMER_MUTATION,
} from 'queries/customer'
import {
  BlockedCustomersForRestaurant,
  BlockedCustomersForRestaurantVariables,
} from 'types/BlockedCustomersForRestaurant'
import {
  UnblockCustomer,
  UnblockCustomerVariables,
} from 'types/UnblockCustomer'

interface Props
  extends Omit<React.ComponentProps<typeof Button>, 'onClick' | 'loading'> {
  restaurantId: string
  blockedUserId: string
}

const UnblockCustomerButton: React.FC<Props> = ({
  restaurantId,
  blockedUserId,
  ...restProps
}) => {
  const [blockCustomerMutation, { loading }] = useMutation<
    UnblockCustomer,
    UnblockCustomerVariables
  >(UNBLOCK_CUSTOMER_MUTATION, {
    variables: { blockedUserId },
    update: (cache, { data }) => {
      if (data && data.deleteBlockedUser?.blockedUser) {
        let blockedCustomers
        try {
          blockedCustomers = cache.readQuery<
            BlockedCustomersForRestaurant,
            BlockedCustomersForRestaurantVariables
          >({
            query: BLOCKED_CUSTOMERS_FOR_RESTAURANT_QUERY,
            variables: {
              restaurantId,
            },
          })
        } catch (cacheReadError) {
          blockedCustomers = undefined
        }

        if (blockedCustomers) {
          cache.writeQuery<
            BlockedCustomersForRestaurant,
            BlockedCustomersForRestaurantVariables
          >({
            query: BLOCKED_CUSTOMERS_FOR_RESTAURANT_QUERY,
            variables: {
              restaurantId,
            },
            data: {
              blockedUsers: blockedCustomers?.blockedUsers?.length
                ? blockedCustomers.blockedUsers.filter(
                    (blockedUser) => blockedUser?.id !== blockedUserId,
                  )
                : [],
            },
          })
        }
      }
    },
    onError: (error) => {
      message.error(error.message)
    },
    onCompleted: () => {
      message.info('Customer unblocked successfully')
    },
  })

  const handleClick = useCallback(() => {
    blockCustomerMutation()
  }, [blockCustomerMutation])

  return (
    <Button {...restProps} loading={loading} onClick={handleClick}>
      Unblock Customer
    </Button>
  )
}

export default UnblockCustomerButton
