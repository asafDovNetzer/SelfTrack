import React from "react";
import classes from "./LandingPage.module.css";
import { connect, ConnectedProps } from "react-redux";
import { LoginData } from "../../Types";
import * as actions from "../../Store/Actions/ActionsIndex";
import { useEffect } from "react";

const LandingPage = (props: PropsFromRedux) => {
  const buttonHandler = () => {
    props.onLogin({
      email: `asaf.ntzr@gmail.com`,
      password: `11111111`,
    });
  };

  useEffect(() => {
    props.onLogout();
    console.log(`back logout`);
  }, [props]);

  return (
    <div className={classes.LandingPage}>
      <div className={classes.Text}>
        <h5>
          This is a portfolio app created by <mark>Asaf Dov Netzer</mark>
        </h5>
        <h5 style={{ textAlign: `center`, lineHeight: `30px` }}>
          A tool designed to <mark>assist</mark> you <br /> with monitoring your{" "}
          <mark>well-Being</mark> and <mark>Activity</mark>.
        </h5>
        <h5>
          <mark>Ultimatly</mark> showing you what you
          <mark>
            <i>REALLY</i>
          </mark>{" "}
          should be doing...
        </h5>
      </div>
      <div className={classes.Demo}>
        <p style={{ fontSize: `150%` }}>
          The app currently allows access to the live demo ONLY.
        </p>
        <button onClick={buttonHandler}>Live Demo</button>
        <p>The demo is filled-up with rendomly generated data.</p>
        <p>New users will be allowed soon</p>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  onLogin: (data: LoginData) => actions.loginAsync(data),
  onLogout: () => actions.logout(),
};
const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LandingPage);
