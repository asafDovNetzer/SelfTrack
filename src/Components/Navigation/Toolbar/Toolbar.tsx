import React from "react";
// import { Navbar } from "react-bootstrap";
// import Login from "../../LoginModal/LoginModal";
import MainMenu from "../../MainMenu/MainMenu";
import Watch from "../../Watch/Watch";
import classes from "./Toolbar.module.css";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../../Types";

const Toolbar = (props: PropsFromRedux) => {
  return (
    <div className={classes.Toolbar}>
      <h2 className={classes.Header}>Self Track</h2>
      {props.user ? <Watch /> : null}
      <MainMenu />
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Toolbar);
