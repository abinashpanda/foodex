import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useQuery } from '@apollo/client'
import { Restaurant, RestaurantVariables } from 'types/Restaurant'
import { RESTAURANT_QUERY } from 'queries/restaurant'
import { Result } from 'antd'
import { getImageUrl } from 'utils/image'
import { Cuisine, LocationMarker } from 'icons'

interface Props {
  restaurantId: string
  className?: string
  style?: React.CSSProperties
}

const RestaurantInfo: React.FC<Props> = ({
  restaurantId,
  className,
  style,
}) => {
  const { data, loading, error } = useQuery<Restaurant, RestaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: { restaurantId },
    },
  )

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="flex items-center space-x-6">
          <div className="w-64 h-40 skeleton" />
          <div className="flex-1">
            <div className="w-7/12 h-8 mb-4 skeleton" />
            <div className="w-4/12 h-4 mb-4 skeleton" />
            <div className="w-3/12 h-4 skeleton" />
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <Result
          status="warning"
          subTitle={error.message}
          className="bg-white rounded-md"
        />
      )
    }

    if (data && data.restaurant) {
      const { restaurant } = data
      return (
        <div className="flex items-center space-x-6">
          <div className="w-64 h-40 overflow-hidden rounded-md">
            {restaurant.images?.[0]?.url ? (
              <img
                src={getImageUrl(restaurant.images[0].url)}
                alt={restaurant.name}
                className="object-cover w-full h-full"
              />
            ) : null}
          </div>
          <div className="flex-1 space-y-3">
            <h1 className="text-2xl text-white">{data.restaurant.name}</h1>
            {restaurant.cuisines && restaurant.cuisines.length > 0 ? (
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <Cuisine className="flex-shrink-0 w-5 h-5" />
                <span className="text-gray-200">
                  {restaurant.cuisines.join(', ')}
                </span>
              </div>
            ) : null}
            {restaurant.location ? (
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <LocationMarker className="flex-shrink-0 w-5 h-5" />
                <span className="text-gray-200">{restaurant.location}</span>
              </div>
            ) : null}
          </div>
        </div>
      )
    }

    return null
  }, [data, error, loading])

  return (
    <div className={clsx('px-4 py-8 bg-gray-900')} style={style}>
      <div className="max-w-screen-lg mx-auto">{content}</div>
    </div>
  )
}

export default RestaurantInfo