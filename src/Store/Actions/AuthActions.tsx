import { LoginData } from "../../Types";
import * as firebase from "../../Firebase";
import * as actionTypes from "./ActionTypes";
// import * as types from "../../Types";
import type { AppDispatch } from "../../index";

export const loginAsync = (data: LoginData) => {
  return (dispatch: AppDispatch) => {
    firebase.auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // const user = userCredential.user;
        window.location.href = `/app`;
        // dispatch(loginSuccess(user));
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          console.log(`err1`);
        } else {
          console.log(`err2`);
        }
      });
  };
};

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN,
    // user: user,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
