import React, { useMemo } from 'react'
import { Button, Result } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import {
  MealsForRestaurant,
  MealsForRestaurantVariables,
} from 'types/MealsForRestaurant'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MEALS_FOR_RESTAURANT_QUERY } from 'queries/meal'
import { range } from 'lodash-es'
import CardLoader from 'components/CardLoader'
import MealCard from 'components/MealCard'
import { MealInfo } from 'types/MealInfo'
import CreateMeal from './CreateMeal'

interface Props {
  restaurant: RestaurantInfo
}

const Meals: React.FC<Props> = ({ restaurant }) => {
  const { loading, error, data } = useQuery<
    MealsForRestaurant,
    MealsForRestaurantVariables
  >(MEALS_FOR_RESTAURANT_QUERY, {
    variables: {
      restaurantId: restaurant.id,
    },
  })

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {range(5).map((val) => (
            <CardLoader key={val} style={{ opacity: 1 - val / 5 }} />
          ))}
        </div>
      )
    }

    if (error) {
      return <Result status="warning" subTitle={error.message} />
    }

    if (data) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.meals?.map((meal) => (
            <MealCard
              meal={meal as MealInfo}
              key={meal?.id}
              editable
              restaurant={restaurant}
            />
          ))}
        </div>
      )
    }

    return null
  }, [data, error, loading, restaurant])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-600">Meals</h1>
        <CreateMeal
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Add Meal
            </Button>
          }
          restaurant={restaurant}
        />
      </div>
      {content}
    </div>
  )
}

export default Meals
