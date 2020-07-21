import React from 'react'
import { Switch } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import Auth from 'components/Auth'
import Apollo from 'components/Apollo'
import Route from 'components/Route'
import AuthScene from 'pages/Auth'
import Home from 'pages/Home'

const App = () => {
  return (
    <ToastProvider>
      <Auth>
        <Apollo>
          <Switch>
            <Route
              path={['/login', '/signup', '/reset-password']}
              component={AuthScene}
            />
            <Route path="/" exact protectedRoute component={Home} />
          </Switch>
        </Apollo>
      </Auth>
    </ToastProvider>
  )
}

export default App
