import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import {
  RestaurantForOwner,
  RestaurantForOwnerVariables,
} from 'types/RestaurantForOwner'
import { RESTAURANT_FOR_OWNER_QUERY } from 'queries/restaurant'
import AuthContext from 'contexts/AuthContext'
import { Redirect } from 'react-router-dom'

const OwnerDashboard = () => {
  const { user } = useContext(AuthContext)

  const { data } = useQuery<RestaurantForOwner, RestaurantForOwnerVariables>(
    RESTAURANT_FOR_OWNER_QUERY,
    { variables: { userId: user?._id as string } },
  )

  if (data) {
    if (data.restaurants?.length === 0) {
      return <Redirect to={{ pathname: '/restaurant-onboarding' }} />
    }
  }

  return null
}

export default OwnerDashboard
