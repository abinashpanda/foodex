import React, { cloneElement, useState, useCallback, useContext } from 'react'
import { Form, Modal, Input, Radio, message } from 'antd'
import { useMutation } from '@apollo/client'
import {
  CreateAddressForUser,
  CreateAddressForUserVariables,
} from 'types/CreateAddressForUser'
import {
  CREATE_ADDRESS_FOR_USER_MUTATION,
  ADDRESSES_FOR_USER_QUERY,
} from 'queries/address'
import AuthContext from 'contexts/AuthContext'
import { User } from 'types/user'
import {
  AddressesForUser,
  AddressesForUserVariables,
} from 'types/AddressesForUser'

interface Props {
  trigger: JSX.Element
}

const AddDeliveryAddress: React.FC<Props> = ({ trigger }) => {
  const { _id: userId } = useContext(AuthContext).user as User

  const [modalOpened, setModalOpened] = useState(false)

  const [form] = Form.useForm()

  const handleModalClose = useCallback(() => {
    setModalOpened(false)
    form.resetFields()
  }, [form])

  const handleModalOpen = useCallback(() => {
    setModalOpened(true)
  }, [])

  const [createAddressForUserMutation, { loading }] = useMutation<
    CreateAddressForUser,
    CreateAddressForUserVariables
  >(CREATE_ADDRESS_FOR_USER_MUTATION, {
    update: (cache, { data }) => {
      if (data && data.createDeliveryAddress) {
        let deliveryAddressesForUser
        try {
          deliveryAddressesForUser = cache.readQuery<
            AddressesForUser,
            AddressesForUserVariables
          >({
            query: ADDRESSES_FOR_USER_QUERY,
            variables: {
              userId,
            },
          })
        } catch (cacheReadError) {
          deliveryAddressesForUser = undefined
        }

        if (deliveryAddressesForUser) {
          cache.writeQuery<AddressesForUser, AddressesForUserVariables>({
            query: ADDRESSES_FOR_USER_QUERY,
            variables: {
              userId,
            },
            data: {
              deliveryAddresses: deliveryAddressesForUser.deliveryAddresses
                ?.length
                ? [
                    ...deliveryAddressesForUser.deliveryAddresses,
                    data.createDeliveryAddress.deliveryAddress,
                  ]
                : [data.createDeliveryAddress.deliveryAddress],
            },
          })
        }
      }
    },
    onCompleted: () => {
      message.success('Address added successfully')
      handleModalClose()
    },
    onError: (error) => {
      message.error(error.message)
    },
  })

  const handleSubmit = useCallback(
    ({ flat, street, landmark, type }) => {
      createAddressForUserMutation({
        variables: {
          flat,
          street,
          landmark,
          type,
          userId,
        },
      })
    },
    [createAddressForUserMutation, userId],
  )

  return (
    <>
      {cloneElement(trigger, { onClick: handleModalOpen })}
      <Modal
        visible={modalOpened}
        onCancel={handleModalClose}
        title="Add Delivery Address"
        okText="Add Address"
        onOk={() => {
          form.submit()
        }}
        okButtonProps={{ loading }}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          colon={false}
          initialValues={{ type: 'HOME' }}
        >
          <Form.Item
            name="flat"
            label="Flat/Door No."
            rules={[{ required: true, message: 'Flat/Door No. is required' }]}
          >
            <Input placeholder="Flat/Door No." />
          </Form.Item>
          <Form.Item
            name="street"
            label="Street Adress"
            rules={[{ required: true, message: 'Street Adress is required' }]}
          >
            <Input placeholder="Street Adress" />
          </Form.Item>
          <Form.Item name="landmark" label="Landmark">
            <Input placeholder="Landmark" />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: 'Address type is required' }]}
          >
            <Radio.Group
              options={[
                { label: 'Home', value: 'HOME' },
                { label: 'Office', value: 'OFFICE' },
                { label: 'Other', value: 'OTHER' },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddDeliveryAddress
