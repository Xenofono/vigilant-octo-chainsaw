import * as actionTypes from "../actions/actionTypes";

export const INGREDIENT_PRICES = {
  salad: 5,
  cheese: 8,
  meat: 20,
  bacon: 12,
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 70,
};

const burgerBuilderReducer = (state = initialState, action) => {
  console.log("i reducer")
  console.log(action)

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      console.log(action)
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.payload] >= 1) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.payload]: state.ingredients[action.payload] - 1,
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
        };
      } else break;

    default:
      return state;
  }

  return state;
};

export default burgerBuilderReducer;
