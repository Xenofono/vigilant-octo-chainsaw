import * as actionTypes from "../actions/actionTypes";

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
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      console.log(action);
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
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: true,
      };
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          ingredients: action.payload,
          error: false
        }

    default:
      return state;
  }

  return state;
};

export default burgerBuilderReducer;
