import React from "react";
import { connect, ConnectedProps } from "react-redux";
import classes from "./ErrorModal.module.css";
import * as actions from "../../../Store/Actions/ActionsIndex";
import { State } from "../../../Types";

const ErrorModal = (props: PropsFromRedux) => {
  if (!props.errorMessage) return null;

  const handleClick = () => {
    props.errorModalFunc();
    props.clearError();
  };

  return (
    <div className={classes.Backdrop}>
      <div className={classes.Modal}>
        <div className={classes.ErrorMessage}>
          <p>{props.errorMessage}</p>
        </div>
        <div className={classes.ButtonPanel}>
          <button onClick={handleClick}>Ok</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  errorMessage: state.errorMessage,
  errorModalFunc: state.errorModalFunc,
});

const mapDispatchToProps = {
  clearError: () => actions.setError(null, () => {}),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ErrorModal);
