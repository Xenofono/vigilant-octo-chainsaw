import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = (ingName) => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: ingName,
});

export const removeIngredient = (ingName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: ingName,
});

export const setIngredients = (ingredients) => {
  return { 
    type: actionTypes.SET_INGREDIENTS,
    payload: ingredients
  }
}

export const setError = (error) => {
  return {
    type: actionTypes.SET_ERROR
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios
    .get("ingredients.json")
    .then((response) => {
      dispatch(setIngredients(response.data))
    })
    .catch((error) => {
      dispatch(setError())
    });
  }
}


