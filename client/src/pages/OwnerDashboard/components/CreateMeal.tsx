import React, { useCallback, useContext, useState, cloneElement } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  RestaurantForOwnerVariables,
  RestaurantForOwner,
} from 'types/RestaurantForOwner'
import { RESTAURANT_FOR_OWNER_QUERY } from 'queries/restaurant'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'
import { RestaurantInfo } from 'types/RestaurantInfo'
import { CREATE_MEAL_MUTATION, MEALS_FOR_RESTAURANT_QUERY } from 'queries/meal'
import {
  CreateMeal as CreateMealInterface,
  CreateMealVariables,
} from 'types/CreateMeal'
import {
  MealsForRestaurant,
  MealsForRestaurantVariables,
} from 'types/MealsForRestaurant'
import { message, Form, Input, InputNumber, Modal } from 'antd'
import ImageUploader from 'components/ImageUploader'

interface Props {
  trigger: JSX.Element
}

const CreateMeal: React.FC<Props> = ({ trigger }) => {
  const [modalOpened, setModalOpened] = useState(false)

  const [form] = Form.useForm()

  const handleModalClose = useCallback(() => {
    setModalOpened(false)
    form.resetFields()
  }, [form])

  const handleModalOpen = useCallback(() => {
    setModalOpened(true)
  }, [])

  const { _id: userId } = useContext(AuthContext).user as User

  const { data: restaurantData } = useQuery<
    RestaurantForOwner,
    RestaurantForOwnerVariables
  >(RESTAURANT_FOR_OWNER_QUERY, { variables: { userId } })

  const [createMealMutation, { loading }] = useMutation<
    CreateMealInterface,
    CreateMealVariables
  >(CREATE_MEAL_MUTATION, {
    update: (cache, { data }) => {
      if (
        data &&
        data.createMeal?.meal &&
        restaurantData?.restaurants?.length
      ) {
        const { id: restaurantId } = restaurantData
          .restaurants[0] as RestaurantInfo

        let mealsForRestaurant

        try {
          mealsForRestaurant = cache.readQuery<
            MealsForRestaurant,
            MealsForRestaurantVariables
          >({ query: MEALS_FOR_RESTAURANT_QUERY, variables: { restaurantId } })
        } catch (cacheReadError) {
          mealsForRestaurant = undefined
        }

        if (mealsForRestaurant) {
          cache.writeQuery<MealsForRestaurant, MealsForRestaurantVariables>({
            query: MEALS_FOR_RESTAURANT_QUERY,
            variables: { restaurantId },
            data: {
              meals: mealsForRestaurant.meals?.length
                ? [...mealsForRestaurant.meals, data.createMeal.meal]
                : [data.createMeal.meal],
            },
          })
        }
      }
    },
    onCompleted: () => {
      message.success('Meal added successfully')
      handleModalClose()
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  const handleSubmit = useCallback(
    ({ name, price, description, image }) => {
      if (restaurantData?.restaurants?.length) {
        const { id: restaurantId } = restaurantData
          .restaurants[0] as RestaurantInfo
        createMealMutation({
          variables: {
            name,
            price: Number.parseFloat(price),
            description,
            image: image ? image[0]?.response?._id : undefined,
            restaurantId,
          },
        })
      }
    },
    [createMealMutation, restaurantData],
  )

  return (
    <>
      {cloneElement(trigger, { onClick: handleModalOpen })}
      <Modal
        title="Add Meal"
        visible={modalOpened}
        onCancel={handleModalClose}
        okButtonProps={{ loading }}
        onOk={() => {
          form.submit()
        }}
      >
        <Form
          className="space-y-6"
          onFinish={handleSubmit}
          layout="vertical"
          colon={false}
          form={form}
        >
          <Form.Item
            name="name"
            label="Meal Name"
            rules={[{ required: true, message: 'Meal name is required' }]}
          >
            <Input name="name" id="name" placeholder="Pizza Margherita" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Price is required' }]}
          >
            <InputNumber
              name="price"
              id="price"
              placeholder="0.00"
              type="number"
              prefix="₹"
              className="w-full"
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              autoSize={{ minRows: 3 }}
              name="description"
              id="description"
              placeholder="Neapolitan pizza made with San Marzano tomatoes, mozzarella cheese, fresh basil"
              className="resize-none"
            />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(event) => event.fileList}
          >
            <ImageUploader multiple={false} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateMeal
