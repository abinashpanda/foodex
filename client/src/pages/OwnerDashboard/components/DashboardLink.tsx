import React, { createElement } from 'react'
import clsx from 'clsx'
import { Link, useRouteMatch } from 'react-router-dom'

interface Props {
  icon: React.ComponentType<any>
  label: string
  to: string
  pathname?: string
  exact?: boolean
  className?: string
  style?: React.CSSProperties
}

const DashboardLink: React.FC<Props> = ({
  icon,
  label,
  to,
  pathname,
  className,
  style,
}) => {
  const isActive = useRouteMatch({
    exact: true,
    strict: true,
    path: pathname || to,
  })

  return (
    <Link
      className={clsx(
        'flex items-center px-4 py-2 space-x-3 text-sm rounded-md border group',
        isActive
          ? 'text-green-500 bg-green-50 border-green-200'
          : 'text-gray-500 border-transparent hover:border-green-300',
        className,
      )}
      style={style}
      to={to}
    >
      {createElement(icon, { className: 'w-5 h-5' })}
      <span
        className={clsx(
          isActive
            ? 'text-green-600'
            : 'text-gray-900 group-hover:text-green-500',
        )}
      >
        {label}
      </span>
    </Link>
  )
}

export default DashboardLink
