import React, { useCallback, useContext } from 'react'
import { FormItem, FormLabel, Input, FormError, Button } from 'ui-kit'
import TagsInput from 'ui-kit/TagsInput'
import { useForm, Controller } from 'react-hook-form'
import ImageUploader from 'ui-kit/ImageUploader'
import RestaurantCard from 'components/RestaurantCard'
import { useMutation } from '@apollo/client'
import {
  CreateRestaurant,
  CreateRestaurantVariables,
} from 'types/CreateRestaurant'
import {
  CREATE_RESTAURANT_MUTATION,
  RESTAURANT_FOR_OWNER_QUERY,
} from 'queries/restaurant'
import { useToasts } from 'react-toast-notifications'
import {
  RestaurantForOwner,
  RestaurantForOwnerVariables,
} from 'types/RestaurantForOwner'
import AuthContext from 'contexts/AuthContext'
import { useHistory } from 'react-router-dom'

interface RestaurantFormData {
  name: string
  location: string
  cuisines: string[]
  images: { id: string; url: string }[]
}

const RestaurantOnboarding = () => {
  const { user } = useContext(AuthContext)

  const { handleSubmit, control, errors, register, watch } = useForm<
    RestaurantFormData
  >()

  const restaurantCardData = {
    name: watch().name || 'Your restaurant name',
    location: watch().location || 'Restaurant location',
    cuisines:
      watch().cuisines?.length > 0 ? watch().cuisines : ['Restaurant cuisine'],
    images: watch().images || [],
  }

  const { addToast } = useToasts()

  const history = useHistory()

  const [createRestaurantMutation, { loading }] = useMutation<
    CreateRestaurant,
    CreateRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    update: (cache, { data }) => {
      if (data && data.createRestaurant?.restaurant) {
        cache.writeQuery<RestaurantForOwner, RestaurantForOwnerVariables>({
          query: RESTAURANT_FOR_OWNER_QUERY,
          variables: { userId: user?._id ?? '' },
          data: {
            restaurants: [data.createRestaurant.restaurant],
          },
        })
      }
    },
    onCompleted: () => {
      addToast('Restaurant onboarded successfully', { appearance: 'success' })
      // redirect to home page
      history.push('/')
    },
    onError: (error) => {
      addToast(error.message, { appearance: 'error' })
    },
  })

  const onSubmit = useCallback(
    ({ name, cuisines, location, images }: RestaurantFormData) => {
      createRestaurantMutation({
        variables: {
          name,
          location,
          images: images.map((image) => image.id),
          cuisines,
          ownerId: user?._id ?? '',
        },
      })
    },
    [createRestaurantMutation, user],
  )

  return (
    <div className="flex items-center justify-center w-full h-screen p-4 bg-gray-100">
      <div className="flex w-full max-w-3xl bg-white rounded-lg shadow">
        <div className="flex-1 p-8 border-r border-gray-100">
          <div className="text-lg font-medium text-gray-800">
            Onboard your restaurant
          </div>
          <div className="mb-6 text-sm text-gray-400">
            Enter your restaurant details to see how it would look
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="name">Name of Restaurant</FormLabel>
              <Input
                name="name"
                id="name"
                placeholder="Ceaser's Palace"
                ref={register({
                  required: {
                    value: true,
                    message: 'Restaurant name is required',
                  },
                })}
              />
              {errors?.name ? (
                <FormError>{errors.name.message}</FormError>
              ) : null}
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                name="location"
                id="location"
                placeholder="Cannaught Palace, New Delhi"
                ref={register()}
              />
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="cuisines">Cuisines</FormLabel>
              <Controller
                control={control}
                name="cuisines"
                rules={{
                  required: { message: 'Cuisines are required', value: true },
                  validate: (value) => Array.isArray(value) && value.length > 0,
                }}
                render={({ value, onBlur, onChange }) => (
                  <TagsInput
                    placeholder="Type a cuisine and press enter"
                    id="cuisines"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                )}
              />
              {errors?.cuisines ? (
                <FormError>
                  {(errors.cuisines as any).message ||
                    'Enter atleast 1 cuisine'}{' '}
                </FormError>
              ) : null}
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="images">Images</FormLabel>
              <Controller
                name="images"
                control={control}
                render={({ value, onChange }) => (
                  <ImageUploader value={value} onChange={onChange} />
                )}
              />
            </FormItem>
            <Button type="submit" buttonType="primary" loading={loading}>
              Submit
            </Button>
          </form>
        </div>

        <div className="flex items-center justify-center p-8">
          <div className="w-64">
            <RestaurantCard restaurant={restaurantCardData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantOnboarding
