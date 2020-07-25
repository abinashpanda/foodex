/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Restaurant
// ====================================================

export interface Restaurant_restaurant_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface Restaurant_restaurant {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (Restaurant_restaurant_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface Restaurant {
  restaurant: Restaurant_restaurant | null;
}

export interface RestaurantVariables {
  restaurantId: string;
}
