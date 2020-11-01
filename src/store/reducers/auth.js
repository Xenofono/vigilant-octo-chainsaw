import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.payload, loading: false });
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.payload.idToken,
        userId: action.payload.localId,
        loading: false,
        error: null,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null });
    case actionTypes.AUTH_REDIRECT:
      return updateObject(state, { authRedirectPath: action.payload})

    default:
      return state;
  }
};

export default reducer;
