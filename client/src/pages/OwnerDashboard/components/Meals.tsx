import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import {
  MealsForRestaurant,
  MealsForRestaurantVariables,
} from 'types/MealsForRestaurant'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { MEALS_FOR_RESTAURANT_QUERY } from 'queries/meal'
import CreateMeal from './CreateMeal'

interface Props {
  restaurant: RestaurantInfo
}

const Meals: React.FC<Props> = ({ restaurant }) => {
  const { loading } = useQuery<MealsForRestaurant, MealsForRestaurantVariables>(
    MEALS_FOR_RESTAURANT_QUERY,
    {
      variables: {
        restaurantId: restaurant.id,
      },
    },
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold text-gray-700">Meals</div>
        <CreateMeal
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              Add Meal
            </Button>
          }
        />
      </div>
      {loading ? <div className="w-full h-4 skeleton" /> : null}
      <div className="grid grid-cols-4 gap-4" />
    </div>
  )
}

export default Meals
