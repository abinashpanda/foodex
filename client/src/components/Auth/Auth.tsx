import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
import { User } from 'types/user'
import AuthContext from 'contexts/AuthContext'

interface Props {
  children: React.ReactElement
}

const Auth: React.FC<Props> = ({ children }) => {
  const [authVerified, setAuthVerified] = useState(false)

  const [jwt, setJWT] = useState<string | undefined>(undefined)
  const [user, setUser] = useState<User | undefined>(undefined)

  const { addToast } = useToasts()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const savedJWT = localStorage.getItem('jwt-token')
      if (savedJWT) {
        try {
          const { data } = await axios.get<User>('/users/me', {
            headers: { Authorization: `Bearer ${savedJWT}` },
            baseURL: 'https://localhost:1337',
          })
          setUser(data)
          setJWT(savedJWT)
        } catch (error) {
          const errorMessage =
            error.response?.message || 'Something went wrong. Please try again'
          addToast(errorMessage, { appearance: 'error' })
        } finally {
          setAuthVerified(true)
        }
      } else {
        setAuthVerified(true)
      }
    }
    fetchUserInfo()
  }, [addToast])

  const signOut = useCallback(() => {}, [])

  const signInWithEmail = useCallback(() => {}, [])

  if (!authVerified) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
        <div className="mb-4 spinner" />
        <div className="text-xs text-gray-600">Verifying User...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, jwt, signOut, signInWithEmail }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth
