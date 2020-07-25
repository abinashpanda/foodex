import React, { useCallback, useContext } from 'react'
import { useMutation } from '@apollo/client'
import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from 'types/CreateRestaurant'
import {
  CREATE_RESTAURANT_MUTATION,
  RESTAURANT_FOR_OWNER_QUERY,
} from 'queries/restaurant'
import {
  RestaurantForOwner,
  RestaurantForOwnerVariables,
} from 'types/RestaurantForOwner'
import AuthContext from 'contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import AppShell from 'components/AppShell'
import { User } from 'types/user'
import { message, Form, Input, Select, Button } from 'antd'
import { cuisines } from 'utils/cuisine'
import ImageUploader from 'components/ImageUploader'

const RestaurantOnboarding = () => {
  const { _id: userId } = useContext(AuthContext).user as User

  const history = useHistory()

  const [createRestaurantMutation, { loading }] = useMutation<
    CreateRestaurant,
    CreateRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    update: (cache, { data }) => {
      if (data && data.createRestaurant?.restaurant) {
        cache.writeQuery<RestaurantForOwner, RestaurantForOwnerVariables>({
          query: RESTAURANT_FOR_OWNER_QUERY,
          variables: { userId },
          data: {
            restaurants: [data.createRestaurant.restaurant],
          },
        })
      }
    },
    onCompleted: () => {
      message.success('Restaurant onboarded successfully')
      // redirect to home page
      history.push('/')
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  const handleSubmit = useCallback(
    ({ name, cuisines, location, images }) => {
      createRestaurantMutation({
        variables: {
          name,
          location,
          images: (images || [])
            .map((image: any) => image.response?._id)
            .filter((id: any) => !!id),
          cuisines,
          ownerId: userId,
        },
      })
    },
    [createRestaurantMutation, userId],
  )

  return (
    <AppShell>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex w-full max-w-xl bg-white rounded-lg shadow">
          <div className="flex-1 p-8 border-r border-gray-100">
            <div className="text-lg font-medium text-gray-800">
              Onboard your restaurant
            </div>
            <div className="mb-6 text-sm text-gray-400">
              Enter your restaurant details to see how it would look
            </div>
            <Form
              className="space-y-6"
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Restaurant Name"
                rules={[
                  { required: true, message: 'Restaurant name is required' },
                ]}
              >
                <Input name="name" id="name" placeholder="Ceaser's Palace" />
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: 'Restaurant location is required',
                  },
                ]}
              >
                <Input
                  name="location"
                  id="location"
                  placeholder="Cannaught Palace, New Delhi"
                />
              </Form.Item>
              <Form.Item
                label="Cuisines"
                name="cuisines"
                rules={[
                  {
                    required: true,
                    message: 'Cuisines are required',
                    type: 'array',
                  },
                ]}
              >
                <Select mode="tags" placeholder="Select restaurant cuisines">
                  {cuisines.map((cuisine) => (
                    <Select.Option value={cuisine} key={cuisine}>
                      {cuisine}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Images"
                name="images"
                valuePropName="fileList"
                getValueFromEvent={(event) => event.fileList}
                rules={[
                  {
                    required: true,
                    message: 'Image is required',
                    type: 'array',
                  },
                ]}
              >
                <ImageUploader multiple />
              </Form.Item>
              <Button htmlType="submit" type="primary" loading={loading}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default RestaurantOnboarding
