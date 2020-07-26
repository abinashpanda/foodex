import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useQuery } from '@apollo/client'
import {
  MealsForRestaurant,
  MealsForRestaurantVariables,
} from 'types/MealsForRestaurant'
import { MEALS_FOR_RESTAURANT_QUERY } from 'queries/meal'
import { range } from 'lodash-es'
import CardLoader from 'components/CardLoader'
import { Result } from 'antd'
import { MealInfo } from 'types/MealInfo'
import MealCard from 'components/MealCard'
import { Restaurant, RestaurantVariables } from 'types/Restaurant'
import { RESTAURANT_QUERY } from 'queries/restaurant'

interface Props {
  restaurantId: string
  className?: string
  style?: React.CSSProperties
}

const RestaurantMeals: React.FC<Props> = ({
  restaurantId,
  className,
  style,
}) => {
  const { loading, data, error } = useQuery<
    MealsForRestaurant,
    MealsForRestaurantVariables
  >(MEALS_FOR_RESTAURANT_QUERY, {
    variables: { restaurantId },
  })

  const { data: restaurantData } = useQuery<Restaurant, RestaurantVariables>(
    RESTAURANT_QUERY,
    { variables: { restaurantId } },
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
          {data.meals?.map((meal) => {
            const mealData = meal as MealInfo
            return (
              <MealCard
                meal={mealData}
                key={mealData.id}
                restaurant={restaurantData?.restaurant ?? undefined}
              />
            )
          })}
        </div>
      )
    }

    return null
  }, [data, error, loading, restaurantData])

  return (
    <div className={clsx('px-4', className)}>
      <div className="max-w-screen-lg mx-auto" style={style}>
        <h1 className="mb-6 text-xl font-bold text-gray-600">Meals</h1>
        {content}
      </div>
    </div>
  )
}

export default RestaurantMeals
