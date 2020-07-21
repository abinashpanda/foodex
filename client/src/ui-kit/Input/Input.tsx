import React, { forwardRef } from 'react'
import clsx from 'clsx'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = forwardRef(
  ({ className, ...restProps }: Props, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full px-3 py-2 border rounded-md form-input',
          className,
        )}
        {...restProps}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
