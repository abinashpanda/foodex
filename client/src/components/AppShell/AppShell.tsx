import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

interface Props {
  children: React.ReactElement
}

const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="relative z-10 h-12 bg-white shadow">
        <div className="flex items-center h-full max-w-screen-lg mx-auto space-x-4">
          <img
            src={require('../../images/logo.png')}
            alt="FoodEx"
            className="w-10 h-10"
          />
          {/* TODO: Add user controls with logout button */}
        </div>
      </div>
      <div className="flex-1 bg-gray-50">
        <Scrollbars style={{ height: '100%' }} autoHide universal>
          {children}
        </Scrollbars>
      </div>
    </div>
  )
}

export default AppShell
