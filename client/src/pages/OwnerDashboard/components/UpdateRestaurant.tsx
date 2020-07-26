import React, { useCallback } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { Form, Input, Button, Select, message } from 'antd'
import ImageUploader from 'components/ImageUploader'
import { cuisines } from 'utils/cuisine'
import { useMutation } from '@apollo/client'
import {
  UpdateRestaurant as updateRestaurantInterface,
  UpdateRestaurantVariables,
} from 'types/UpdateRestaurant'
import {
  UPDATE_RESTAURANT_MUTATION,
  RESTAURANT_INFO_FRAGMENT,
} from 'queries/restaurant'
import { transformToUploaderObject } from 'utils/image'

interface Props extends RouteComponentProps {
  restaurant: RestaurantInfo
}

const UpdateRestaurant: React.FC<Props> = ({ restaurant }) => {
  const [updateRestaurantMutation, { loading }] = useMutation<
    updateRestaurantInterface,
    UpdateRestaurantVariables
  >(UPDATE_RESTAURANT_MUTATION, {
    update: (cache, { data }) => {
      if (data?.updateRestaurant?.restaurant) {
        cache.writeFragment<RestaurantInfo>({
          fragment: RESTAURANT_INFO_FRAGMENT,
          fragmentName: 'RestaurantInfo',
          id: restaurant.id,
          data: data?.updateRestaurant?.restaurant,
        })
      }
    },
    onCompleted: () => {
      message.success('Restaurant updated successfully')
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  const handleSubmit = useCallback(
    ({ name, cuisines, location, images }) => {
      updateRestaurantMutation({
        variables: {
          name,
          location,
          images: (images || [])
            .map((image: any) => image.response?._id)
            .filter((id: any) => !!id),
          cuisines,
          restaurantId: restaurant.id,
        },
      })
    },
    [restaurant.id, updateRestaurantMutation],
  )

  return (
    <div className="max-w-lg">
      <h1 className="mb-6 text-xl font-bold text-gray-600">
        Update Restaurant Data
      </h1>
      <Form
        className="space-y-6"
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          name: restaurant.name,
          location: restaurant.location,
          cuisines: restaurant.cuisines,
          images: restaurant.images
            ? restaurant.images
                .filter((image) => !!image)
                .map((image) =>
                  transformToUploaderObject(
                    image as { id: string; url: string },
                  ),
                )
            : [],
        }}
      >
        <Form.Item
          name="name"
          label="Restaurant Name"
          rules={[{ required: true, message: 'Restaurant name is required' }]}
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
  )
}

export default UpdateRestaurant
