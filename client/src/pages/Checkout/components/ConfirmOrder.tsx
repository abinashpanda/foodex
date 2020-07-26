import React, { useContext, useMemo, useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  AddressesForUser,
  AddressesForUserVariables,
} from 'types/AddressesForUser'
import { ADDRESSES_FOR_USER_QUERY } from 'queries/address'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'
import { range } from 'lodash-es'
import { Result, Button, Form, Radio, message } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import { AddressInfo } from 'types/AddressInfo'
import { PlaceOrder, PlaceOrderVariables } from 'types/PlaceOrder'
import { PLACE_ORDER_MUTATION, ORDERS_FOR_CUSTOMER_QUERY } from 'queries/order'
import { useHistory } from 'react-router-dom'
import CartContext from 'contexts/CartContext'
import { RestaurantInfo } from 'types/RestaurantInfo'
import {
  OrdersForCustomer,
  OrdersForCustomerVariables,
} from 'types/OrdersForCustomer'
import { LocationMarker } from 'icons'
import AddDeliveryAddress from './AddDeliveryAddress'

const ConfirmOrder = () => {
  const { _id: userId } = useContext(AuthContext).user as User

  const {
    mealsQuantity,
    restaurantSelected,
    totalCost,
    resetCart,
  } = useContext(CartContext)
  const { id: restaurantId } = restaurantSelected as RestaurantInfo

  const { loading, data, error } = useQuery<
    AddressesForUser,
    AddressesForUserVariables
  >(ADDRESSES_FOR_USER_QUERY, { variables: { userId } })

  const history = useHistory()

  const [placeOrderMutation, { loading: placingOrder }] = useMutation<
    PlaceOrder,
    PlaceOrderVariables
  >(PLACE_ORDER_MUTATION, {
    update: (cache, { data }) => {
      if (data && data.placeOrder) {
        let ordersPlaced
        try {
          ordersPlaced = cache.readQuery<
            OrdersForCustomer,
            OrdersForCustomerVariables
          >({
            query: ORDERS_FOR_CUSTOMER_QUERY,
            variables: { customerId: userId },
          })
        } catch (cacheReadError) {
          ordersPlaced = undefined
        }

        if (ordersPlaced) {
          cache.writeQuery<OrdersForCustomer, OrdersForCustomerVariables>({
            query: ORDERS_FOR_CUSTOMER_QUERY,
            variables: { customerId: userId },
            data: {
              orders: ordersPlaced?.orders?.length
                ? [...ordersPlaced.orders, data.placeOrder]
                : [data.placeOrder],
            },
          })
        }
      }
    },
    onCompleted: (placedOrderData) => {
      resetCart()
      message.success('Order placed successfully')
      history.push(`/orders/${placedOrderData?.placeOrder?.id}`)
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  const handleSubmit = useCallback(
    ({ deliveryAddress }) => {
      placeOrderMutation({
        variables: {
          customerId: userId,
          restaurantId,
          price: totalCost,
          meals: Object.keys(mealsQuantity).map((meal) => ({
            meal,
            quantity: mealsQuantity[meal],
          })),
          deliveryAddressId: deliveryAddress,
        },
      })
    },
    [mealsQuantity, placeOrderMutation, restaurantId, totalCost, userId],
  )

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-3">
          {range(4).map((val) => (
            <div
              key={val}
              style={{ opacity: 1 - val / 4 }}
              className="p-2 border border-gray-200 rounded-md"
            >
              <div className="w-full h-4 mb-2 skeleton" />
              <div className="w-7/12 h-3 mb-2 skeleton" />
              <div className="w-5/12 h-3 skeleton" />
            </div>
          ))}
        </div>
      )
    }

    if (error) {
      return <Result status="warning" subTitle={error.message} />
    }

    if (data) {
      return (
        <div className="space-y-4">
          {data.deliveryAddresses?.length ? (
            <Form
              initialValues={{
                deliveryAddress: data.deliveryAddresses?.[0]?.id,
              }}
              onFinish={handleSubmit}
            >
              <Form.Item name="deliveryAddress">
                <Radio.Group
                  name="deliveryAddress"
                  className="flex flex-col space-y-4 address-radio-group"
                >
                  {data.deliveryAddresses?.map((address) => {
                    const addressData = address as AddressInfo
                    return (
                      <div
                        className="p-2 border border-gray-200 rounded-md"
                        key={address?.id}
                      >
                        <Radio value={addressData.id}>
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-gray-600">
                              {[
                                addressData?.flat,
                                addressData?.street,
                                addressData?.landmark,
                              ].join(', ')}
                            </div>
                            <div className="inline-block px-3 py-1 text-xs font-medium tracking-wide text-green-500 uppercase bg-green-100 rounded-full">
                              {addressData.type}
                            </div>
                          </div>
                        </Radio>
                      </div>
                    )
                  })}
                </Radio.Group>
              </Form.Item>
              <Button
                type="primary"
                className="w-full"
                htmlType="submit"
                loading={placingOrder}
              >
                Place Order
              </Button>
            </Form>
          ) : (
            <div className="text-sm text-gray-500">
              No delivery address present
            </div>
          )}
          <AddDeliveryAddress
            trigger={
              <Button
                type="default"
                className="w-full"
                icon={<EnvironmentOutlined />}
                htmlType="button"
              >
                Add Delivery Address
              </Button>
            }
          />
        </div>
      )
    }

    return null
  }, [data, error, handleSubmit, loading, placingOrder])

  return (
    <div className="p-4 rounded-md shadow">
      <div className="flex items-center mb-4 space-x-2 font-medium text-green-500">
        <LocationMarker className="w-5 h-5" />
        <div>Deliver To</div>
      </div>
      {content}
    </div>
  )
}

export default ConfirmOrder
