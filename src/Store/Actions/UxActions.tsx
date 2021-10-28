// import { LoginData, User } from "../../Types";
import * as actionTypes from "./ActionTypes";

export const setError = (error: string | null, continueFunc: () => void) => {
  console.log(error);
  return {
    type: actionTypes.SET_ERROR,
    error: error,
    continueFunc: continueFunc,
  };
};

export const goTo = (selected: string) => {
  return {
    type: actionTypes.GO_TO,
    selected: selected,
  };
};

export const displayEntries = (id: string) => {
  return {
    type: actionTypes.DISPLAY_ENTRIES,
    id: id,
  };
};
