import React, { createElement, useCallback } from 'react'
import clsx from 'clsx'
import { Select } from 'antd'
import { useHistory, useLocation, matchPath } from 'react-router-dom'

interface Route {
  label: string
  icon: React.ComponentType<any>
  to: string
  pathname?: string
}

interface Props {
  routes: Route[]
  className?: string
  style?: React.CSSProperties
}

const RouteSelect: React.FC<Props> = ({ routes, className, style }) => {
  const history = useHistory()
  const { pathname: locationPathName } = useLocation()

  const handleRouteChange = useCallback(
    (route: string) => {
      history.push(route)
    },
    [history],
  )

  const selectedRoute = routes.filter((route) =>
    matchPath(locationPathName, {
      exact: true,
      strict: true,
      path: route.pathname || route.to,
    }),
  )[0]

  return (
    <Select
      className={clsx('w-full', className)}
      style={style}
      onChange={handleRouteChange}
      value={selectedRoute?.to}
    >
      {routes.map((route) => (
        <Select.Option value={route.to} key={route.to}>
          <div className="flex items-center space-x-2">
            {createElement(route.icon, { className: 'w-4 h-4' })}
            <div>{route.label}</div>
          </div>
        </Select.Option>
      ))}
    </Select>
  )
}

export default RouteSelect
