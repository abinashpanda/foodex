import React, { forwardRef } from 'react'
import clsx from 'clsx'

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea = forwardRef(
  ({ className, ...restProps }: Props, ref: React.Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        className={clsx(
          'flex-1 focus:outline-none px-3 py-2 border rounded-md focus:shadow-outline',
          className,
        )}
        ref={ref}
        {...restProps}
      />
    )
  },
)

TextArea.displayName = 'TextArea'

export default TextArea
