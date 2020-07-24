import React from 'react'
import { MealInfo } from 'types/MealInfo'
import clsx from 'clsx'

interface Props {
  meal: MealInfo
  className?: string
  style?: React.CSSProperties
}

const MealCard: React.FC<Props> = ({ meal, className, style }) => {
  return (
    <div
      className={clsx('overflow-hidden rounded-md border bg-white', className)}
      style={style}
    >
      <div className="w-full h-32 bg-gray-200">
        {meal.image ? (
          <img
            src={meal.image.url}
            alt={meal.name || ''}
            className="object-cover w-full h-full"
          />
        ) : null}
      </div>
    </div>
  )
}

export default MealCard
