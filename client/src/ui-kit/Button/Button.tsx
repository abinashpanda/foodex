import React, { forwardRef, cloneElement, useMemo } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
  buttonType?: 'primary' | 'secondary' | 'link'
  href?: string
}

const Button = forwardRef(
  (
    {
      loading,
      buttonType = 'primary',
      href,
      disabled,
      className,
      children,
      ...restProps
    }: Props,
    ref: React.Ref<HTMLButtonElement> | React.Ref<HTMLAnchorElement>,
  ) => {
    const buttonChildren = loading ? (
      <div className="inline-block w-4 h-4 spinner" />
    ) : (
      children
    )

    const element = href ? (
      href.startsWith('http') ? (
        <a href={href} ref={ref as React.Ref<HTMLAnchorElement>}>
          {buttonChildren}
        </a>
      ) : (
        <Link to={href} ref={ref as React.Ref<HTMLAnchorElement>}>
          {buttonChildren}
        </Link>
      )
    ) : (
      <button ref={ref as React.Ref<HTMLButtonElement>}>
        {buttonChildren}
      </button>
    )

    const isButtonDisabled = loading || disabled

    const buttonClass = useMemo(() => {
      if (buttonType === 'primary') {
        if (isButtonDisabled) {
          return 'bg-gray-100 text-gray-800 border-transparent'
        }
        return 'text-white bg-green-500 border-transparent'
      }

      if (buttonType === 'secondary') {
        if (isButtonDisabled) {
          return 'text-gray-800 bg-white border border-gray-300'
        }
        return 'text-green-500 bg-white border border-green-500'
      }

      if (buttonType === 'link') {
        if (isButtonDisabled) {
          return 'text-gray-800 bg-transparent'
        }
        return 'text-green-500 bg-transparent'
      }

      return undefined
    }, [buttonType, isButtonDisabled])

    return cloneElement(element, {
      className: clsx(
        'px-4 py-2 mb-8 rounded-md border focus:outline-none focus:shadow-outline text-center',
        buttonClass,
        className,
      ),
      disabled: isButtonDisabled,
      ...restProps,
    })
  },
)

Button.displayName = 'Button'

export default Button
