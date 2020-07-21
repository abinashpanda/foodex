import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FormItem, FormError, FormLabel, Button, Input } from 'ui-kit'
import Radio from 'ui-kit/Radio'

const Signup = () => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      userType: 'CUSTOMER',
    },
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
          Sign up at <span className="text-green-500">FoodEx</span>
        </div>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <FormLabel htmlFor="email">Name</FormLabel>
          <Input
            name="name"
            placeholder="Name"
            id="name"
            ref={register({
              required: { value: true, message: 'Name is required' },
            })}
          />
          {errors?.name ? <FormError>{errors.name.message}</FormError> : null}
        </FormItem>
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
        <FormItem>
          <div className="flex items-center space-x-4">
            <FormLabel className="flex items-center space-x-2">
              <Radio
                name="userType"
                value="RESTAURANT_OWNER"
                ref={register({
                  required: { value: true, message: 'User type is required' },
                })}
              />
              <span>Restaurant Owner</span>
            </FormLabel>
            <FormLabel className="flex items-center space-x-2">
              <Radio
                name="userType"
                value="CUSTOMER"
                ref={register({
                  required: { value: true, message: 'User type is required' },
                })}
              />
              <span>Customer</span>
            </FormLabel>
          </div>
          {errors?.userType ? (
            <FormError>{errors.userType.message}</FormError>
          ) : null}
        </FormItem>
        <Button className="w-full" type="submit">
          Sign up
        </Button>
      </form>
      <div className="relative border-b border-gray-200">
        <div className="absolute px-2 text-sm text-center text-gray-400 whitespace-no-wrap transform -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2">
          or if you have registered
        </div>
      </div>
      <Button className="w-full" buttonType="secondary" href="/login">
        Login
      </Button>
    </>
  )
}

export default Signup
