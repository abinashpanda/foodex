import React, { useState, useCallback } from 'react'
import { RestaurantInfo, RestaurantInfo_images } from 'types/RestaurantInfo'
import clsx from 'clsx'
import { mod } from 'utils/number'
import { ChevronLeft, ChevronRight, Cuisine, LocationMarker } from 'icons'
import { getImageUrl } from 'utils/image'

interface Restaurant
  extends Omit<RestaurantInfo, 'id' | '__typename' | 'images'> {
  images: (Omit<RestaurantInfo_images, '__typename'> | null)[] | null
}

interface Props {
  restaurant: Restaurant
  className?: string
  style?: React.CSSProperties
}

const RestaurantCard: React.FC<Props> = ({ restaurant, className, style }) => {
  const { images, cuisines, name, location } = restaurant

  const restaurantImages = (images?.filter((image) => !!image) ??
    []) as RestaurantInfo_images[]

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const handlePrevImageClick = useCallback(() => {
    setActiveImageIndex((prevState) =>
      mod(prevState - 1, restaurantImages.length),
    )
  }, [restaurantImages.length])

  const handleNextImageClick = useCallback(() => {
    setActiveImageIndex((prevState) =>
      mod(prevState + 1, restaurantImages.length),
    )
  }, [restaurantImages.length])

  return (
    <div
      className={clsx(
        'w-full max-w-xs rounded-md overflow-hidden shadow bg-white group flex flex-col',
        className,
      )}
      style={style}
    >
      <div className="relative w-full h-32 bg-gray-100">
        {restaurantImages.length > 0 ? (
          <img
            src={getImageUrl(restaurantImages[activeImageIndex].url)}
            alt=""
            className="object-cover w-full h-full"
          />
        ) : null}
        {restaurantImages.length > 1 ? (
          <>
            <button
              className="absolute left-0 p-1 ml-2 text-gray-800 transform -translate-y-1/2 bg-white rounded-full opacity-50 top-1/2 group-hover:opacity-100"
              onClick={handlePrevImageClick}
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              className="absolute right-0 p-1 mr-2 text-gray-800 transform -translate-y-1/2 bg-white rounded-full opacity-50 top-1/2 group-hover:opacity-100"
              onClick={handleNextImageClick}
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </>
        ) : null}
      </div>
      <div className="flex-1 p-4 space-y-2">
        <div className="font-medium text-gray-800">{name}</div>
        {cuisines && cuisines.length > 0 ? (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Cuisine className="flex-shrink-0 w-4 h-4" />
            <span className="text-gray-500">{cuisines.join(', ')}</span>
          </div>
        ) : null}
        {location ? (
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <LocationMarker className="flex-shrink-0 w-4 h-4" />
            <span className="text-gray-500">{location}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RestaurantCard
