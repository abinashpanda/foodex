import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, FormItem, FormLabel, Input, FormError } from 'ui-kit'

const ResetPassword = () => {
  const { handleSubmit, register, errors } = useForm()

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
          Reset Password
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
        <Button className="w-full" type="submit">
          Reset Password
        </Button>
      </form>
    </>
  )
}

export default ResetPassword
