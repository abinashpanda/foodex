import React from 'react'
import clsx from 'clsx'

interface Props
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const FormLabel: React.FC<Props> = ({ className, ...restProps }) => {
  return (
    <label
      className={clsx(
        'form-label block text-sm font-medium text-gray-700',
        className,
      )}
      {...restProps}
    />
  )
}

export default FormLabel
