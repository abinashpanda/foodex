import React, { useCallback } from 'react'
import { MealInfo } from 'types/MealInfo'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { Dropdown, Menu, Modal, message } from 'antd'
import { MoreOutlined, DeleteFilled } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { DeleteMealVariables, DeleteMeal } from 'types/DeleteMeal'
import { DELETE_MEAL_MUTATION, MEALS_FOR_RESTAURANT_QUERY } from 'queries/meal'
import {
  MealsForRestaurant,
  MealsForRestaurantVariables,
} from 'types/MealsForRestaurant'
import UpdateMeal from './UpdateMeal'

interface Props {
  meal: MealInfo
  restaurant: RestaurantInfo
  className?: string
  style?: React.CSSProperties
}

const MealMenu: React.FC<Props> = ({ meal, restaurant, className, style }) => {
  const [deleteMealMutation] = useMutation<DeleteMeal, DeleteMealVariables>(
    DELETE_MEAL_MUTATION,
    {
      variables: {
        mealId: meal.id,
      },
      update: (cache, { data }) => {
        if (data?.deleteMeal?.meal) {
          const { id: restaurantId } = restaurant

          let mealsForRestaurant

          try {
            mealsForRestaurant = cache.readQuery<
              MealsForRestaurant,
              MealsForRestaurantVariables
            >({
              query: MEALS_FOR_RESTAURANT_QUERY,
              variables: { restaurantId },
            })
          } catch (cacheReadError) {
            mealsForRestaurant = undefined
          }

          if (mealsForRestaurant) {
            cache.writeQuery<MealsForRestaurant, MealsForRestaurantVariables>({
              query: MEALS_FOR_RESTAURANT_QUERY,
              variables: { restaurantId },
              data: {
                meals: mealsForRestaurant.meals?.length
                  ? mealsForRestaurant.meals.filter(
                      (restaurantMeal) => restaurantMeal?.id !== meal.id,
                    )
                  : [],
              },
            })
          }
        }
      },
      onError: (error) => {
        message.error(error.message)
      },
    },
  )

  const handleDeleteMeal = useCallback(() => {
    Modal.confirm({
      title: 'Delete Meal',
      content:
        'Meal once deleted cannot be recovered. Do you want to continue?',
      okButtonProps: {
        danger: true,
      },
      okText: 'Yes',
      cancelText: 'No',
      icon: <DeleteFilled />,
      onOk: () => {
        deleteMealMutation()
      },
    })
  }, [deleteMealMutation])

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu>
          <Menu.Item className="relative h-8">
            <UpdateMeal
              trigger={
                <button className="absolute inset-0 px-4 py-1 focus:outline-none">
                  Edit Meal
                </button>
              }
              meal={meal}
            />
          </Menu.Item>
          <Menu.Item onClick={handleDeleteMeal}>Delete Meal</Menu.Item>
        </Menu>
      }
    >
      <MoreOutlined className={className} style={style} />
    </Dropdown>
  )
}

export default MealMenu
