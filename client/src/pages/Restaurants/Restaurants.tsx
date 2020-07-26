import React, { useMemo } from 'react'
import AppShell from 'components/AppShell'
import { useQuery } from '@apollo/client'
import { RESTAURANTS_FOR_CUSTOMER_QUERY } from 'queries/restaurant'
import { RestaurantsForCustomer } from 'types/RestaurantsForCustomer'
import { range } from 'lodash-es'
import CardLoader from 'components/CardLoader'
import { Result } from 'antd'
import RestaurantCard from 'components/RestaurantCard'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { Link } from 'react-router-dom'

const Restaurants = () => {
  const { loading, data, error } = useQuery<RestaurantsForCustomer>(
    RESTAURANTS_FOR_CUSTOMER_QUERY,
  )

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {range(6).map((val) => (
            <CardLoader key={val} style={{ opacity: 1 - val / 6 }} />
          ))}
        </div>
      )
    }

    if (error) {
      return <Result status="warning" subTitle={error.message} />
    }

    if (data) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.restaurants?.map((restaurant) => {
            const restaurantData = restaurant as RestaurantInfo
            return (
              <Link
                to={`/restaurants/${restaurantData.id}`}
                key={restaurantData.id}
                className="block h-full"
              >
                <RestaurantCard
                  restaurant={restaurantData}
                  className="h-full"
                />
              </Link>
            )
          })}
        </div>
      )
    }

    return null
  }, [data, error, loading])

  return (
    <AppShell>
      <div className="px-4">
        <div className="max-w-screen-lg mx-auto my-4">
          <h1 className="mb-4 text-xl font-bold text-gray-600">Top Picks</h1>
          {content}
        </div>
      </div>
    </AppShell>
  )
}

export default Restaurants
