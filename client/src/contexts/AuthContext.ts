import { createContext } from 'react'
import { User } from 'types/user'

const AuthContext = createContext<{
  jwt?: string
  user?: User
  signOut: () => void
  signInWithEmail: ({
    name,
    email,
    password,
    userType,
  }: {
    name: string
    email: string
    password: string
    userType: string
  }) => void
}>({
  jwt: undefined,
  user: undefined,
  signOut: () => {},
  signInWithEmail: () => {},
})

export default AuthContext
