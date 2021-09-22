// import { Reducer } from "react";
import { AnyAction } from "redux";
import * as types from "../Types";
import * as actionTypes from "./Actions/ActionTypes";

const initialState: types.State = {
  user: false,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: false,
      };
    default:
      return state;
  }
};

export default reducer;
