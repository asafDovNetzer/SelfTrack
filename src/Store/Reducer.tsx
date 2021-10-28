// import { Reducer } from "react";
import { AnyAction } from "redux";
import * as types from "../Types";
import * as actionTypes from "./Actions/ActionTypes";

const initialState: types.State = {
  user: null,
  userName: ``,
  errorMessage: null,
  submitionState: `await`,
  selectedView: `trackers`,
  entriesToDisplay: ``,
  errorModalFunc: () => {},
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_SUBMITION_STATE:
      return {
        ...state,
        submitionState: action.state,
      };
    case actionTypes.DISPLAY_ENTRIES:
      return {
        ...state,
        entriesToDisplay: action.id,
      };
    case actionTypes.GO_TO:
      return {
        ...state,
        selectedView: action.selected,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        errorMessage: action.error,
        errorModalFunc: action.continueFunc,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: false,
      };
    case actionTypes.SET_USER_NAME:
      return {
        ...state,
        userName: action.userName,
      };
    default:
      return state;
  }
};

export default reducer;
