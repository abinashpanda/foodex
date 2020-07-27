import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useMutation } from '@apollo/client'
import { BlockCustomer, BlockCustomerVariables } from 'types/BlockCustomer'
import {
  BLOCK_CUSTOMER_MUTATION,
  BLOCKED_CUSTOMERS_FOR_RESTAURANT_QUERY,
} from 'queries/customer'
import {
  BlockedCustomersForRestaurant,
  BlockedCustomersForRestaurantVariables,
} from 'types/BlockedCustomersForRestaurant'

interface Props
  extends Omit<
    React.ComponentProps<typeof Button>,
    'onClick' | 'loading' | 'danger'
  > {
  restaurantId: string
  customerId: string
}

const BlockUserButton: React.FC<Props> = ({
  restaurantId,
  customerId,
  ...restProps
}) => {
  const [blockCustomerMutation, { loading }] = useMutation<
    BlockCustomer,
    BlockCustomerVariables
  >(BLOCK_CUSTOMER_MUTATION, {
    variables: { restaurantId, customerId },
    update: (cache, { data }) => {
      if (data && data.createBlockedUser?.blockedUser) {
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
                ? [
                    data.createBlockedUser.blockedUser,
                    ...blockedCustomers.blockedUsers,
                  ]
                : [data.createBlockedUser.blockedUser],
            },
          })
        }
      }
    },
    onError: (error) => {
      message.error(error.message)
    },
    onCompleted: () => {
      message.info('Customer blocked successfully')
    },
  })

  const handleClick = useCallback(() => {
    blockCustomerMutation()
  }, [blockCustomerMutation])

  return (
    <Button {...restProps} danger loading={loading} onClick={handleClick}>
      Block Customer
    </Button>
  )
}

export default BlockUserButton
