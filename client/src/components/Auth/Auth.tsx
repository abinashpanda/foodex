import React, { useState, useCallback, useEffect } from 'react'
import Axios from 'axios'
import { User } from 'types/user'
import AuthContext from 'contexts/AuthContext'
import { message } from 'antd'
import { getErrorMessage } from 'utils/error'

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
          message.error(getErrorMessage(error.response?.data?.message))
        } finally {
          setAuthVerified(true)
        }
      } else {
        setAuthVerified(true)
      }
    }
    fetchUserInfo()
  }, [])

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
          identifier: email,
          password,
        })
        message.success(
          user.type === 'RESTAURANT_OWNER'
            ? 'Logged in successfully'
            : 'Good food waiting for you.',
        )
        if (rememberMe) {
          window.localStorage.setItem('jwt', jwt)
        }
        setJWT(jwt)
        setUser(user)
        return true
      } catch (error) {
        message.error(getErrorMessage(error.response?.data?.message))
        return false
      }
    },
    [],
  )

  const signUpWithEmail = useCallback(
    async ({
      name,
      type,
      email,
      password,
      rememberMe,
    }: {
      name: string
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
          { username: email, name, type, email, password },
        )
        message.success('Congratulations. You account is created successfully.')
        if (rememberMe) {
          window.localStorage.setItem('jwt', jwt)
        }
        setJWT(jwt)
        setUser(user)
        return true
      } catch (error) {
        message.error(getErrorMessage(error.response?.data?.message))
        return false
      }
    },
    [],
  )

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await client.post('/auth/forgot-password', { email })
      message.success(
        `Email with instructions to reset your password is sent to ${email}`,
      )
      return true
    } catch (error) {
      message.error(getErrorMessage(error.response?.data?.message))
      return false
    }
  }, [])

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
      value={{
        user,
        jwt,
        signOut,
        signInWithEmail,
        signUpWithEmail,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default Auth
