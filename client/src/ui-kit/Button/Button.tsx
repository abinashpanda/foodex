import React, { forwardRef, cloneElement } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  buttonType?: 'primary' | 'secondary' | 'link'
  href?: string
}

const Button = forwardRef(
  (
    { buttonType = 'primary', href, className, children, ...restProps }: Props,
    ref: React.Ref<HTMLButtonElement> | React.Ref<HTMLAnchorElement>,
  ) => {
    const element = href ? (
      href.startsWith('http') ? (
        <a href={href} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </a>
      ) : (
        <Link to={href} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      )
    ) : (
      <button ref={ref as React.Ref<HTMLButtonElement>}>{children}</button>
    )

    return cloneElement(element, {
      className: clsx(
        'px-4 py-2 mb-8 rounded-md border focus:outline-none focus:shadow-outline text-center',
        buttonType === 'primary'
          ? 'text-white bg-green-500 border-transparent'
          : buttonType === 'secondary'
          ? 'text-green-500 bg-white border border-green-500'
          : buttonType === 'link'
          ? 'text-green-500 bg-white'
          : undefined,
        className,
      ),
      ...restProps,
    })
  },
)

Button.displayName = 'Button'

export default Button
