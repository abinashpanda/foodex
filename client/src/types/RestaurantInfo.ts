/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RestaurantInfo
// ====================================================

export interface RestaurantInfo_images {
  __typename: "UploadFile";
  url: string;
  id: string;
}

export interface RestaurantInfo {
  __typename: "Restaurant";
  id: string;
  name: string;
  images: (RestaurantInfo_images | null)[] | null;
  cuisines: any;
  location: string;
}
