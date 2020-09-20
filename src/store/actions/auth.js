import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_START,
  AUTH_LOGOUT,
  AUTH_REDIRECT,
} from "./actionTypes";
import axios from "axios";

const KEY = "AIzaSyDxkP0wp9p7UEH-MQQUdpEYMNnvxgzDfBg";
const ROOT_URL = `https://identitytoolkit.googleapis.com/v1/accounts:`;

export const authStart = () => ({ type: AUTH_START });
export const authSuccess = (authData) => ({
  type: AUTH_SUCCESS,
  payload: authData,
});
export const authFail = (error) => ({ type: AUTH_FAIL, payload: error });

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiresAt");
  localStorage.removeItem("userId");
  return { type: AUTH_LOGOUT };
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const auth = (email, password, isSignUp) => {
  const request = {
    email,
    password,
    returnSecureToken: true,
  };
  console.log("IS SIGNUP: ", isSignUp);
  //if isSignUp is true then the requests targets signup endpoint, otherwise login endpoint
  const URL =
    ROOT_URL + `${isSignUp ? "signUp" : "signInWithPassword"}?key=${KEY}`;
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(URL, request)
      .then((response) => {
        console.log(response);
        const expiresAt = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expiresAt", expiresAt);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log("I AUTH ERROR", err.response);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authRedirect = (path) => ({
  type: AUTH_REDIRECT,
  payload: path,
});

export const authRetrieveStorage = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiresAt = new Date(localStorage.getItem("expiresAt"));
      if (expiresAt > new Date()) {
        const secondsUntilLogout =
          (expiresAt.getTime() - new Date().getTime()) / 1000;
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess({ idToken: token, localId: userId }));
        dispatch(checkAuthTimeout(secondsUntilLogout));
      } else {
        dispatch(logout());
      }
    }
  };
};
