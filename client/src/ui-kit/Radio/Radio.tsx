import React, { forwardRef } from 'react'
import clsx from 'clsx'

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'type'
  > {}

const Radio = forwardRef(
  ({ className, ...restProps }: Props, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        className={clsx('form-radio text-green-500', className)}
        {...restProps}
        type="radio"
        ref={ref}
      />
    )
  },
)

Radio.displayName = 'Radio'

export default Radio
