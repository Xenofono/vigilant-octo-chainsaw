import * as actionTypes from "./actionTypes";

export const addIngredient = (ingName) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: ingName,
});

export const removeIngredient = (ingName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: ingName,
});
