import React, { useMemo } from 'react'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { RouteComponentProps } from 'react-router-dom'
import {
  CustomersForRestaurant,
  CustomersForRestaurantVariables,
} from 'types/CustomersForRestaurant'
import { useQuery } from '@apollo/client'
import {
  CUSTOMERS_FOR_RESTAURANT_QUERY,
  BLOCKED_CUSTOMERS_FOR_RESTAURANT_QUERY,
} from 'queries/customer'
import {
  BlockedCustomersForRestaurant,
  BlockedCustomersForRestaurantVariables,
} from 'types/BlockedCustomersForRestaurant'
import { range, groupBy } from 'lodash-es'
import { Result } from 'antd'
import BlockCustomerButton from './BlockCustomerButton'
import UnblockCustomerButton from './UnblockCustomerButton'

interface Props extends RouteComponentProps {
  restaurant: RestaurantInfo
}

const Customers: React.FC<Props> = ({ restaurant }) => {
  const {
    loading: loadingCustomers,
    data: customers,
    error: customersError,
  } = useQuery<CustomersForRestaurant, CustomersForRestaurantVariables>(
    CUSTOMERS_FOR_RESTAURANT_QUERY,
    { variables: { restaurantId: restaurant.id } },
  )

  const {
    loading: loadingBlockedCustomers,
    data: blockedCustomers,
    error: blockedCustomersError,
  } = useQuery<
    BlockedCustomersForRestaurant,
    BlockedCustomersForRestaurantVariables
  >(BLOCKED_CUSTOMERS_FOR_RESTAURANT_QUERY, {
    variables: { restaurantId: restaurant.id },
  })

  const content = useMemo(() => {
    if (loadingCustomers || loadingBlockedCustomers) {
      return (
        <div className="space-y-4">
          {range(5).map((val) => (
            <div
              className="p-4 rounded-md shadow"
              key={val}
              style={{ opacity: 1 - val / 5 }}
            >
              <div className="w-7/12 h-4 mb-4 skeleton" />
              <div className="w-4/12 h-4 skeleton" />
            </div>
          ))}
        </div>
      )
    }

    if (customersError || blockedCustomersError) {
      return (
        <Result
          status="warning"
          subTitle={customersError?.message || blockedCustomersError?.message}
        />
      )
    }

    if (customers && blockedCustomers) {
      const restaurantCustomer =
        customers.orders
          ?.filter((order) => !!order?.customer)
          .map((order) => ({
            id: order?.customer?.id,
            name: order?.customer?.name,
          })) ?? []

      const customersGrouped = groupBy(
        restaurantCustomer,
        (customer) => customer.id,
      )

      const customersWithOrdersCount = Object.keys(customersGrouped).map(
        (customerId) => {
          return {
            id: customerId,
            orders: customersGrouped[customerId].length,
            name: customersGrouped[customerId][0].name,
          }
        },
      )

      return (
        <div className="space-y-4">
          {customersWithOrdersCount.map((customer) => {
            const blockedUserData = blockedCustomers.blockedUsers?.find(
              (blockedUser) => blockedUser?.user?.id === customer.id,
            )

            return (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 rounded-md shadow"
              >
                <div>
                  <div className="mb-1 font-medium text-gray-800">
                    {customer.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {customer.orders}{' '}
                    {customer.orders <= 1 ? 'Order' : 'Orders'}
                  </div>
                </div>
                {blockedUserData ? (
                  <UnblockCustomerButton
                    restaurantId={restaurant.id}
                    blockedUserId={blockedUserData.id}
                  />
                ) : (
                  <BlockCustomerButton
                    restaurantId={restaurant.id}
                    customerId={customer.id}
                  />
                )}
              </div>
            )
          })}
        </div>
      )
    }

    return null
  }, [
    blockedCustomers,
    blockedCustomersError,
    customers,
    customersError,
    loadingBlockedCustomers,
    loadingCustomers,
    restaurant.id,
  ])

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-600">Customers</h1>
      {content}
    </div>
  )
}

export default Customers
