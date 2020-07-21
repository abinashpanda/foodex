import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FormItem, FormLabel, Input, FormError, Button, Checkbox } from 'ui-kit'

const Login = () => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: { rememberMe: true, email: '', password: '' },
  })

  const onSubmit = useCallback((data) => {
    console.log(data)
  }, [])

  return (
    <>
      <div className="space-y-4">
        <img
          src={require('images/logo.png')}
          className="w-12 h-12"
          alt="Logo"
        />
        <div className="relative z-10 mb-4 text-3xl font-bold text-gray-800">
          Login to <span className="text-green-500">FoodEx</span>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            name="email"
            placeholder="Email"
            id="email"
            ref={register({
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email address is invalid',
              },
            })}
          />
          {errors?.email ? <FormError>{errors.email.message}</FormError> : null}
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            ref={register({
              required: { value: true, message: 'Password is required' },
              minLength: {
                value: 8,
                message: 'Password should be atleast 8 characters long',
              },
            })}
          />
          {errors?.password ? (
            <FormError>{errors.password.message}</FormError>
          ) : null}
        </FormItem>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <Checkbox className="mr-2" ref={register()} name="rememberMe" />
            <span className="text-sm font-medium text-center text-gray-500">
              Remember Me
            </span>
          </label>
          <Link
            to="/reset-password"
            className="text-sm font-medium text-center text-green-500"
          >
            Forgot Password?
          </Link>
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
      <div className="relative border-b border-gray-200">
        <div className="absolute px-2 text-sm text-center text-gray-400 whitespace-no-wrap transform -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2">
          or get started
        </div>
      </div>
      <Button className="w-full" buttonType="secondary" href="/signup">
        Sign up
      </Button>
    </>
  )
}

export default Login
