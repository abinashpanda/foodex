import React from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  style?: React.CSSProperties
}

const CardLoader: React.FC<Props> = ({ className, style }) => {
  return (
    <div
      className={clsx(
        'w-full max-w-xs rounded-md overflow-hidden bg-white shadow',
        className,
      )}
      style={style}
    >
      <div className="relative w-full h-32 rounded-none skeleton" />
      <div className="p-4">
        <div className="w-full h-4 mb-2 rounded-md skeleton" />
        <div className="w-7/12 h-4 rounded-md skeleton" />
      </div>
    </div>
  )
}

export default CardLoader
