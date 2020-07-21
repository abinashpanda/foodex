import React, { forwardRef, useState, useCallback } from 'react'
import clsx from 'clsx'
import EyeOff from 'icons/EyeOff'
import Eye from 'icons/Eye'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const Input = forwardRef(
  (
    { className, type, ...restProps }: Props,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = useCallback(() => {
      setPasswordVisible((prevState) => !prevState)
    }, [])

    return (
      <div
        className={clsx(
          'flex items-center space-x-2 px-3 py-2 border rounded-md focus-within:shadow-outline',
          className,
        )}
      >
        <input
          className="flex-1 focus:outline-none"
          ref={ref}
          type={
            type === 'password' ? (passwordVisible ? 'text' : 'password') : type
          }
          {...restProps}
        />
        {type === 'password' ? (
          <button
            className="text-gray-500 focus:outline-none"
            onClick={togglePasswordVisibility}
            type="button"
          >
            {passwordVisible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
