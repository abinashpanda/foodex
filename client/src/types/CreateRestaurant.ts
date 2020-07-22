/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateRestaurant
// ====================================================

export interface CreateRestaurant_createRestaurant_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface CreateRestaurant_createRestaurant_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (CreateRestaurant_createRestaurant_restaurant_images | null)[] | null;
  cuisines: any | null;
  location: string | null;
}

export interface CreateRestaurant_createRestaurant {
  __typename: "createRestaurantPayload";
  restaurant: CreateRestaurant_createRestaurant_restaurant | null;
}

export interface CreateRestaurant {
  createRestaurant: CreateRestaurant_createRestaurant | null;
}

export interface CreateRestaurantVariables {
  name: string;
  location: string;
  cuisines?: any | null;
  images: (string | null)[];
}
