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
        'w-full max-w-sm rounded-md overflow-hidden shadow bg-white group flex flex-row md:flex-col',
        className,
      )}
      style={style}
    >
      <div className="w-32 h-32 md:w-full md:h-32 skeleton" />
      <div className="flex-1 p-4">
        <div className="w-full h-4 mb-2 rounded-md skeleton" />
        <div className="w-7/12 h-4 rounded-md skeleton" />
      </div>
    </div>
  )
}

export default CardLoader
