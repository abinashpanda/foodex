import React, { useCallback, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Checkbox, Form } from 'antd'
import AuthContext from 'contexts/AuthContext'

const Login = () => {
  const { signInWithEmail } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async ({ email, password, rememberMe }) => {
      setLoading(true)
      if (!(await signInWithEmail({ email, password, rememberMe }))) {
        setLoading(false)
      }
    },
    [signInWithEmail],
  )

  return (
    <>
      <div className="space-y-4">
        <img
          src={require('images/logo.png')}
          className="w-12 h-12"
          alt="Logo"
        />
        <div className="relative z-10 text-3xl font-bold text-gray-800">
          Login to <span className="text-green-500">FoodEx</span>
        </div>
      </div>
      <Form
        layout="vertical"
        colon={false}
        onFinish={handleSubmit}
        name="login"
        initialValues={{ rememberMe: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            {
              type: 'email',
              message: 'Email is invalid',
              validateTrigger: 'onblur',
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className="flex items-center justify-between mb-4">
          <Form.Item name="rememberMe" valuePropName="checked" className="mb-0">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <Link
            to="/reset-password"
            className="text-sm font-medium text-center text-green-500"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Login
        </Button>
      </Form>
      <div className="relative border-b border-gray-200">
        <div className="absolute px-2 text-sm text-center text-gray-400 whitespace-no-wrap transform -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2">
          or get started
        </div>
      </div>
      <Link to="/signup">
        <Button className="w-full" type="default">
          Sign up
        </Button>
      </Link>
    </>
  )
}

export default Login
