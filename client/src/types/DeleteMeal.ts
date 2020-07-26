/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteMeal
// ====================================================

export interface DeleteMeal_deleteMeal_meal_image {
  __typename: "UploadFile";
  id: string;
  url: string;
}

export interface DeleteMeal_deleteMeal_meal_restaurant {
  __typename: "Restaurant";
  id: string;
}

export interface DeleteMeal_deleteMeal_meal {
  __typename: "Meal";
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: DeleteMeal_deleteMeal_meal_image | null;
  restaurant: DeleteMeal_deleteMeal_meal_restaurant | null;
}

export interface DeleteMeal_deleteMeal {
  __typename: "deleteMealPayload";
  meal: DeleteMeal_deleteMeal_meal | null;
}

export interface DeleteMeal {
  deleteMeal: DeleteMeal_deleteMeal | null;
}

export interface DeleteMealVariables {
  mealId: string;
}
