import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import AppShell from 'components/AppShell'
import RestaurantInfo from './components/RestaurantInfo'
import RestaurantMeals from './components/RestaurantMeals'

interface Props extends RouteComponentProps {}

const RestaurantDetail: React.FC<Props> = ({ match: { params } }) => {
  const { restaurantId } = params as { restaurantId: string }

  return (
    <AppShell>
      <div className="space-y-4">
        <RestaurantInfo restaurantId={restaurantId} />
        <RestaurantMeals restaurantId={restaurantId} />
      </div>
    </AppShell>
  )
}

export default RestaurantDetail
