/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RestaurantsForCustomer
// ====================================================

export interface RestaurantsForCustomer_restaurants_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface RestaurantsForCustomer_restaurants {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (RestaurantsForCustomer_restaurants_images | null)[] | null;
  cuisines: any;
  location: string;
}

export interface RestaurantsForCustomer {
  restaurants: (RestaurantsForCustomer_restaurants | null)[] | null;
}
