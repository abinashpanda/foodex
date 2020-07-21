import React, { useState, useCallback, useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'
import Axios from 'axios'
import { User } from 'types/user'
import AuthContext from 'contexts/AuthContext'

const client = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

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
      const savedJWT = localStorage.getItem('jwt')
      if (savedJWT) {
        try {
          const { data } = await client.get<User>('/users/me', {
            headers: { Authorization: `Bearer ${savedJWT}` },
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

  const signOut = useCallback(async () => {
    window.localStorage.removeItem('jwt')
    setJWT(undefined)
    setUser(undefined)
    return true
  }, [])

  const signInWithEmail = useCallback(
    async ({
      email,
      password,
      rememberMe,
    }: {
      email: string
      password: string
      rememberMe?: boolean
    }) => {
      try {
        const {
          data: { jwt, user },
        } = await client.post<{ jwt: string; user: User }>('/auth/local', {
          email,
          password,
        })
        addToast(
          user.type === 'RESTAURANT_OWNER'
            ? 'Logged in successfully'
            : 'Good food waiting for you.',
          {
            appearance: 'success',
          },
        )
        if (rememberMe) {
          window.localStorage.setItem('jwt', jwt)
        }
        setJWT(jwt)
        setUser(user)
        return true
      } catch (error) {
        return false
      }
    },
    [addToast],
  )

  const signUpWithEmail = useCallback(
    async ({
      username,
      type,
      email,
      password,
      rememberMe,
    }: {
      username: string
      type: string
      email: string
      password: string
      rememberMe?: boolean
    }) => {
      try {
        const {
          data: { jwt, user },
        } = await client.post<{ jwt: string; user: User }>(
          '/auth/local/register',
          { username, type, email, password },
        )
        addToast('Congratulations. You account is created successfully.', {
          appearance: 'success',
        })
        if (rememberMe) {
          window.localStorage.setItem('jwt', jwt)
        }
        setJWT(jwt)
        setUser(user)
        return true
      } catch (error) {
        return false
      }
    },
    [addToast],
  )

  if (!authVerified) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
        <div className="mb-4 spinner" />
        <div className="text-xs text-gray-600">Verifying User...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{ user, jwt, signOut, signInWithEmail, signUpWithEmail }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default Auth
