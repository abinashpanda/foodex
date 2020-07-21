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

const Checkbox = forwardRef(
  ({ className, ...restProps }: Props, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        className={clsx('form-checkbox text-green-500', className)}
        {...restProps}
        type="checkbox"
        ref={ref}
      />
    )
  },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
