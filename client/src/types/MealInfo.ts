/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MealInfo
// ====================================================

export interface MealInfo_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface MealInfo_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface MealInfo {
  __typename: "Meal";
  id: string;
  name: string | null;
  description: string | null;
  price: number | null;
  image: MealInfo_image | null;
  restaurant: MealInfo_restaurant | null;
}
