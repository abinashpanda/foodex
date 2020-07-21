import React from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  style?: React.CSSProperties
}

const FormItem: React.FC<Props> = ({ children, className, style }) => {
  return (
    <div className={clsx('form-item space-y-1', className)} style={style}>
      {children}
    </div>
  )
}

export default FormItem
