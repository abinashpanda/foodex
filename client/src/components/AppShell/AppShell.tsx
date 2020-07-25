import React, { useContext } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Dropdown, Menu } from 'antd'
import { UserCircle, ShoppingCart } from 'icons'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'

const AppShell: React.FC = ({ children }) => {
  const { user, signOut } = useContext(AuthContext)

  const { name: userName, type: userType } = user as User

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="relative z-10 h-16 bg-white shadow">
        <div className="flex items-center h-full max-w-screen-lg mx-auto space-x-4">
          <img
            src={require('../../images/logo.png')}
            alt="FoodEx"
            className="w-10 h-10"
          />
          <div className="flex-1" />
          {userType === 'CUSTOMER' ? (
            <ShoppingCart className="w-6 h-6" />
          ) : null}
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item onClick={signOut}>Logout</Menu.Item>
              </Menu>
            }
            arrow
          >
            <button className="flex items-center p-2 space-x-2 text-gray-500 rounded focus:outline-none focus:shadow-outline">
              <UserCircle className="w-6 h-6" />
              <span className="text-sm text-gray-600">{userName}</span>
            </button>
          </Dropdown>
        </div>
      </div>
      <div className="flex-1 bg-white">
        <Scrollbars style={{ height: '100%' }} autoHide universal>
          {children}
        </Scrollbars>
      </div>
    </div>
  )
}

export default AppShell
