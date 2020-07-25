/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MealsForRestaurant
// ====================================================

export interface MealsForRestaurant_meals_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface MealsForRestaurant_meals_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface MealsForRestaurant_meals {
  __typename: "Meal";
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: MealsForRestaurant_meals_image | null;
  restaurant: MealsForRestaurant_meals_restaurant | null;
}

export interface MealsForRestaurant {
  meals: (MealsForRestaurant_meals | null)[] | null;
}

export interface MealsForRestaurantVariables {
  restaurantId: string;
}
