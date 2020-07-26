/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMeal
// ====================================================

export interface UpdateMeal_updateMeal_meal_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface UpdateMeal_updateMeal_meal_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface UpdateMeal_updateMeal_meal {
  __typename: "Meal";
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: UpdateMeal_updateMeal_meal_image | null;
  restaurant: UpdateMeal_updateMeal_meal_restaurant | null;
}

export interface UpdateMeal_updateMeal {
  __typename: "updateMealPayload";
  meal: UpdateMeal_updateMeal_meal | null;
}

export interface UpdateMeal {
  updateMeal: UpdateMeal_updateMeal | null;
}

export interface UpdateMealVariables {
  mealId: string;
  name: string;
  price: number;
  description?: string | null;
  image?: string | null;
}
