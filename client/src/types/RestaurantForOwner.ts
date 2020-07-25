/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RestaurantForOwner
// ====================================================

export interface RestaurantForOwner_restaurants_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface RestaurantForOwner_restaurants {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (RestaurantForOwner_restaurants_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface RestaurantForOwner {
  restaurants: (RestaurantForOwner_restaurants | null)[] | null;
}

export interface RestaurantForOwnerVariables {
  userId: string;
}
