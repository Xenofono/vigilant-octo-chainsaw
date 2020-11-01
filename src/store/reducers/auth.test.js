import reducer from "./auth";
import * as actions from "../actions/actionTypes";

describe("auth reducer", () => {
  it("it should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should store token on login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actions.AUTH_SUCCESS,
          payload: { idToken: "exampleToken", localId: "exampleUserId" },
        }
      )
    ).toEqual({token: "exampleToken",
        userId: "exampleUserId",
        error: null,
        loading: false,
        authRedirectPath: "/"});
  });
});
