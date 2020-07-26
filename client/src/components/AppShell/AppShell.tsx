import React, { useContext } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Dropdown, Menu } from 'antd'
import { UserCircle } from 'icons'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import CartContext from 'contexts/CartContext'
import CartBadge from './components/CartBadge'

const AppShell: React.FC = ({ children }) => {
  const { user, signOut } = useContext(AuthContext)

  const { totalItems } = useContext(CartContext)

  const { name: userName, type: userType } = user as User

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="relative z-10 h-16 px-4 bg-white shadow">
        <div className="flex items-center h-full max-w-screen-lg mx-auto space-x-4">
          <Link to="/">
            <img
              src={require('../../images/logo.png')}
              alt="FoodEx"
              className="w-10 h-10"
            />
          </Link>
          <div className="flex-1" />
          {userType === 'CUSTOMER' ? <CartBadge /> : null}
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item>
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/orders-placed">Orders</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={signOut}>Logout</Menu.Item>
              </Menu>
            }
            placement="bottomCenter"
            arrow
          >
            <button className="flex items-center p-2 space-x-2 text-gray-500 rounded focus:outline-none">
              <UserCircle className="w-6 h-6" />
              <span className="text-sm text-gray-600">{userName}</span>
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="flex-1 bg-white">
        <Scrollbars style={{ height: '100%' }} autoHide universal>
          <div
            className={clsx(
              'min-h-full relative',
              totalItems > 0 ? 'pb-20' : undefined,
            )}
          >
            {children}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default AppShell
