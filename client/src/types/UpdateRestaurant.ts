/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateRestaurant
// ====================================================

export interface UpdateRestaurant_updateRestaurant_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface UpdateRestaurant_updateRestaurant_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (UpdateRestaurant_updateRestaurant_restaurant_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface UpdateRestaurant_updateRestaurant {
  __typename: "updateRestaurantPayload";
  restaurant: UpdateRestaurant_updateRestaurant_restaurant | null;
}

export interface UpdateRestaurant {
  updateRestaurant: UpdateRestaurant_updateRestaurant | null;
}

export interface UpdateRestaurantVariables {
  name: string;
  location: string;
  cuisines: any;
  images: (string | null)[];
  restaurantId: string;
}
