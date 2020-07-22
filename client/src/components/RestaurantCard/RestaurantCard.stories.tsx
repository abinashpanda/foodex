import React from 'react'
import RestaurantCard from './RestaurantCard'

export default { title: 'Restaurant Card' }

export const withDefault = () => {
  return (
    <RestaurantCard
      restaurant={{
        name: `Ceaser's Palace`,
        images: [
          {
            url:
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            id: '1',
          },
          {
            url:
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
            id: '2',
          },
        ],
        cuisines: ['Italian', 'Continental'],
        location: 'Cannaught Palace, New Delhi',
      }}
    />
  )
}
