// import { LoginData, User } from "../../Types";
import * as actionTypes from "./ActionTypes";

export const setError = (error: string | null) => {
  console.log(error);
  return {
    type: actionTypes.SET_ERROR,
    error: error,
  };
};

export const goTo = (selected: string) => {
  return {
    type: actionTypes.GO_TO,
    selected: selected,
  };
};
