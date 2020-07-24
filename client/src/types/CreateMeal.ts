/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMeal
// ====================================================

export interface CreateMeal_createMeal_meal_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface CreateMeal_createMeal_meal_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface CreateMeal_createMeal_meal {
  __typename: "Meal";
  id: string;
  name: string | null;
  description: string | null;
  price: number | null;
  image: CreateMeal_createMeal_meal_image | null;
  restaurant: CreateMeal_createMeal_meal_restaurant | null;
}

export interface CreateMeal_createMeal {
  __typename: "createMealPayload";
  meal: CreateMeal_createMeal_meal | null;
}

export interface CreateMeal {
  createMeal: CreateMeal_createMeal | null;
}

export interface CreateMealVariables {
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  restaurantId: string;
}
