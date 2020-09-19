import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

export const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 8,
  meat: 20,
  bacon: 12,
};

const initialState = {
  ingredients: null,
  totalPrice: 70,
  error: false,
  building: false
};

const adjustIngredient = (state, action, func) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.payload]: func(state.ingredients[action.payload]),
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: func(state.totalPrice, INGREDIENT_PRICES[action.payload]),
    building: true 
  };
  return updateObject(state, updatedState);
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return adjustIngredient(
        state,
        action,
        (target, defaultValue = 1) => target + defaultValue
      );

    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.payload] >= 1) {
        return adjustIngredient(
          state,
          action,
          (target, defaultValue = 1) => target - defaultValue,
        );
      } else break;
    case actionTypes.SET_ERROR:
      return updateObject(state, { error: true });
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.payload,
        error: false,
        totalPrice: 70,
        building:false
      });

    default:
      return state;
  }

  return state;
};

export default burgerBuilderReducer;
