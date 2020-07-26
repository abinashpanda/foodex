import React, { useMemo } from 'react'
import AppShell from 'components/AppShell'
import { useQuery } from '@apollo/client'
import { OrderVariables, Order } from 'types/Order'
import { ORDER_QUERY } from 'queries/order'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Result } from 'antd'
import { range, orderBy } from 'lodash-es'
import { OrderInfo } from 'types/OrderInfo'
import { getImageUrl } from 'utils/image'
import { StatusInfo } from 'types/StatusInfo'
import moment from 'moment'
import { Clock } from 'icons'
import MarkReceivedButton from 'components/MarkReceivedButton'
import ReorderButton from 'components/ReorderButton'
import { getStatusName } from 'utils/status'

interface Props extends RouteComponentProps {}

const OrderDetail: React.FC<Props> = ({ match: { params } }) => {
  const { orderId } = params as { orderId: string }

  const { loading, data, error } = useQuery<Order, OrderVariables>(
    ORDER_QUERY,
    {
      variables: { orderId },
      pollInterval: 10000,
    },
  )

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="grid items-start grid-cols-3 gap-4">
          <div className="col-span-2 p-4 bg-white rounded-md shadow">
            <div className="flex mb-4 space-x-4">
              <div className="w-16 h-16 rounded-md skeleton" />
              <div className="flex-1">
                <div className="w-7/12 h-4 mb-4 skeleton" />
                <div className="w-4/12 h-4 skeleton" />
              </div>
            </div>
            <div className="space-y-4">
              {range(6).map((val) => (
                <div
                  key={val}
                  className="flex items-center justify-between"
                  style={{ opacity: 1 - val / 6 }}
                >
                  <div className="w-48 h-4 skeleton" />
                  <div className="w-16 h-4 skeleton" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 p-4 space-y-4 bg-white rounded-md shadow">
            {range(6).map((val) => (
              <div
                key={val}
                className="p-3 rounded-md shadow"
                style={{ opacity: 1 - val / 6 }}
              >
                <div className="w-full h-4 mb-2 skeleton" />
                <div className="w-7/12 h-4 skeleton" />
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (error) {
      return <Result status="warning" subTitle={error.message} />
    }

    if (data) {
      const { restaurant, orderItems, statuses } = data.order as OrderInfo

      const orderStatuses = orderBy(
        statuses as StatusInfo[],
        (status) => moment(status.createdAt).valueOf(),
        'desc',
      )

      return (
        <div className="grid items-start grid-cols-3 gap-4">
          <div className="col-span-2 p-4 bg-white rounded-md shadow">
            {restaurant ? (
              <Link
                to={`/restaurants/${restaurant.id}`}
                className="flex mb-4 space-x-4"
              >
                {restaurant.images?.[0]?.url ? (
                  <img
                    src={getImageUrl(restaurant.images[0].url)}
                    alt={restaurant.name}
                    className="object-cover w-16 h-16 rounded-md"
                  />
                ) : null}
                <div>
                  <div className="text-base font-medium text-gray-800">
                    {restaurant.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {restaurant.cuisines.join(', ')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {restaurant.location}
                  </div>
                </div>
              </Link>
            ) : null}
            {orderItems?.length ? (
              <>
                <div className="mb-4 text-xs font-medium tracking-wider text-green-500 uppercase">
                  Items Ordered
                </div>
                <div className="mb-4 space-y-4">
                  {orderItems.map((orderItem) => (
                    <div
                      key={orderItem?.id}
                      className="flex items-center space-x-4"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-700">
                          {orderItem?.meal?.name} x {orderItem?.quantity}
                        </div>
                        <div className="max-w-sm text-xs text-gray-400 truncate">
                          {orderItem?.meal?.description}
                        </div>
                      </div>
                      <div className="flex-1" />
                      <div className="w-16 text-right">
                        ₹
                        {(orderItem?.meal?.price ?? 0) *
                          (orderItem?.quantity ?? 0)}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
            <div className="mb-4 text-xs font-medium tracking-wider text-green-500 uppercase">
              Bill Details
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-700">
                Items Total
              </div>
              <div className="w-16 text-right">₹{data.order?.price}</div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-700">
                Delivery Charges
              </div>
              <div className="w-16 text-right">₹0</div>
            </div>
            <div className="mb-4 border-b" />
            <div className="flex items-center justify-between">
              <div className="text-base font-medium text-gray-900">To Pay</div>
              <div className="w-16 font-medium text-right text-gray-900">
                ₹{data.order?.price ?? 0}
              </div>
            </div>
          </div>
          <div className="col-span-1 p-4 bg-white rounded-md shadow">
            <div className="flex items-center mb-4 space-x-2 font-medium text-green-500">
              <Clock className="w-5 h-5" />
              <div>Order Status</div>
            </div>
            <div className="space-y-4">
              {orderStatuses.map((status) => (
                <div key={status.id} className="p-3 rounded-md shadow">
                  <div className="font-medium text-gray-800">
                    {getStatusName(status.status)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {moment(status.createdAt).format('Do MMM, YYYY | hh:mm a')}
                  </div>
                </div>
              ))}
              {orderStatuses[0].status === 'DELIVERED' ? (
                <MarkReceivedButton
                  className="w-full"
                  order={data.order as OrderInfo}
                />
              ) : null}
              {orderStatuses[0].status === 'RECEIVED' ? (
                <ReorderButton
                  className="w-full"
                  order={data.order as OrderInfo}
                />
              ) : null}
            </div>
          </div>
        </div>
      )
    }

    return null
  }, [data, error, loading])

  return (
    <AppShell>
      <div className="max-w-screen-lg py-4 mx-auto">{content}</div>
    </AppShell>
  )
}

export default OrderDetail
