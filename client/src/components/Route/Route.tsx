import React, { useContext } from 'react'
import {
  RouteProps,
  Route as ReactRouterRoute,
  Redirect,
} from 'react-router-dom'
import invariant from 'tiny-invariant'
import AuthContext from 'contexts/AuthContext'

interface Props extends RouteProps {
  protectedRoute?: boolean
  moduleName?: string
}

const Route: React.FC<Props> = ({
  protectedRoute,
  moduleName,
  location,
  ...routeProps
}) => {
  invariant(
    typeof moduleName === 'string' ? protectedRoute : true,
    'Module protection is only available for protectedRoute',
  )

  const { jwt, user } = useContext(AuthContext)

  if (protectedRoute && !(jwt && user)) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { redirectedFrom: location ? location.pathname : undefined },
        }}
      />
    )
  }

  return <ReactRouterRoute {...routeProps} />
}

Route.defaultProps = {
  protectedRoute: false,
}

export default Route
