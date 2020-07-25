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
        <div className="grid grid-cols-4 gap-4">
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
        <div className="grid grid-cols-4 gap-4">
          {data.restaurants?.map((restaurant) => {
            const restaurantData = restaurant as RestaurantInfo
            return (
              <Link to={`/restaurants/${restaurantData.id}`}>
                <RestaurantCard
                  restaurant={restaurantData}
                  key={restaurantData.id}
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
      <div className="max-w-screen-lg m-4 mx-auto">
        <h1 className="mb-6 text-xl font-bold text-gray-600">Top Picks</h1>
        {content}
      </div>
    </AppShell>
  )
}

export default Restaurants