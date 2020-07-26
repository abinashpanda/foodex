import React, { useState, useCallback, cloneElement } from 'react'
import { MealInfo } from 'types/MealInfo'
import { Modal, Form, Input, InputNumber, message } from 'antd'
import ImageUploader from 'components/ImageUploader'
import { transformToUploaderObject } from 'utils/image'
import { useMutation } from '@apollo/client'
import {
  UpdateMeal as UpdateMealInterface,
  UpdateMealVariables,
} from 'types/UpdateMeal'
import { UPDATE_MEAL_MUTATION, MEAL_INFO_FRAGMENT } from 'queries/meal'

interface Props {
  trigger: JSX.Element
  meal: MealInfo
}

const UpdateMeal: React.FC<Props> = ({ trigger, meal }) => {
  const [modalOpened, setModalOpened] = useState(false)

  const [form] = Form.useForm()

  const handleModalClose = useCallback(() => {
    setModalOpened(false)
    form.resetFields()
  }, [form])

  const handleModalOpen = useCallback(() => {
    setModalOpened(true)
  }, [])

  const [updateMealMutation, { loading }] = useMutation<
    UpdateMealInterface,
    UpdateMealVariables
  >(UPDATE_MEAL_MUTATION, {
    update: (cache, { data }) => {
      if (data?.updateMeal?.meal) {
        cache.writeFragment<MealInfo>({
          fragment: MEAL_INFO_FRAGMENT,
          fragmentName: 'MealInfo',
          id: meal.id,
          data: data.updateMeal.meal,
        })
      }
    },
    onError: (error) => {
      message.error(error.message)
    },
    onCompleted: () => {
      message.success('Meal updated successfully')
      handleModalClose()
    },
  })

  const handleSubmit = useCallback(
    ({ name, price, description, image }) => {
      updateMealMutation({
        variables: {
          name,
          price: Number.parseFloat(price),
          description,
          image: image ? image[0]?.response?._id : undefined,
          mealId: meal.id,
        },
      })
    },
    [meal.id, updateMealMutation],
  )

  return (
    <>
      {cloneElement(trigger, { onClick: handleModalOpen })}
      <Modal
        title="Update Meal"
        visible={modalOpened}
        onCancel={handleModalClose}
        onOk={() => {
          form.submit()
        }}
        okButtonProps={{ loading }}
        okText="Update Meal"
      >
        <Form
          className="space-y-6"
          onFinish={handleSubmit}
          layout="vertical"
          colon={false}
          form={form}
          initialValues={{
            name: meal.name,
            price: meal.price,
            description: meal.description,
            image: meal.image
              ? [transformToUploaderObject(meal.image)]
              : undefined,
          }}
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
            rules={[
              { required: true, message: 'Image is required', type: 'array' },
            ]}
          >
            <ImageUploader multiple={false} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UpdateMeal
