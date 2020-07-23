import React, { useCallback, useState, useContext } from 'react'
import AuthContext from 'contexts/AuthContext'
import { Form, Button, Checkbox, Input, Radio } from 'antd'
import { Link } from 'react-router-dom'

const Signup = () => {
  const { signUpWithEmail } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async ({ username, email, password, type, rememberMe }) => {
      setLoading(true)
      if (
        !(await signUpWithEmail({
          username,
          email,
          password,
          type,
          rememberMe,
        }))
      ) {
        setLoading(false)
      }
    },
    [signUpWithEmail],
  )

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
      <Form
        onFinish={handleSubmit}
        initialValues={{ type: 'CUSTOMER', rememberMe: true }}
        layout="vertical"
        colon={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input name="username" placeholder="Name" id="name" />
        </Form.Item>
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
          <Input name="email" placeholder="Email" id="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password
            placeholder="Password"
            type="password"
            id="password"
            name="password"
          />
        </Form.Item>
        <Form.Item name="type">
          <Radio.Group>
            <Radio value="RESTAURANT_OWNER">Restaurant Owner</Radio>
            <Radio value="CUSTOMER">Customer</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox name="rememberMe">Remember Me</Checkbox>
        </Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Sign up
        </Button>
      </Form>
      <div className="relative border-b border-gray-200">
        <div className="absolute px-2 text-sm text-center text-gray-400 whitespace-no-wrap transform -translate-x-1/2 -translate-y-1/2 bg-white left-1/2 top-1/2">
          or if you have registered
        </div>
      </div>
      <Link to="/login">
        <Button className="w-full" type="default">
          Login
        </Button>
      </Link>
    </>
  )
}

export default Signup
