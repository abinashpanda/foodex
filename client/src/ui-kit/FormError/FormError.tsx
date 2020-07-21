import React from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  style?: React.CSSProperties
}

const FormError: React.FC<Props> = ({ children, className, style }) => {
  return (
    <div
      className={clsx('text-xs text-red-500 font-medium', className)}
      style={style}
    >
      {children}
    </div>
  )
}

export default FormError
