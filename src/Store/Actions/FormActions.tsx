import * as actionTypes from "./ActionTypes";

export const setSubmitionState = (state: boolean | string) => {
  return {
    type: actionTypes.SET_SUBMITION_STATE,
    state: state,
  };
};
