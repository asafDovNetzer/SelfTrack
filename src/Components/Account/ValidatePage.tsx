import React from "react";
import classes from "./ValidatePage.module.css";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { State } from "../../Types";
import Divider from "../UI/Divider";
import Spinner from "../Spinner/Spinner";
import * as actions from "../../Store/Actions/ActionsIndex";

const ValidatePage = (props: PropsFromRedux) => {
  useEffect(() => {
    if (!props.user) return;

    if (props.user.emailVerified) window.location.href = "/app";
  }, [props.user]);

  const handleVerify = () => {
    props.sendEmail();
  };

  if (!props.user) {
    return <Spinner />;
  }

  return (
    <div className={classes.Page}>
      <div className={classes.ValidatePage}>
        <h1>
          Welcome,{" "}
          {props.user!.displayName ? props.user!.displayName : props.userName}
        </h1>
        <Divider />
        <p>
          A verification email was sent to <mark>{props.user!.email}</mark>
        </p>
        <p>
          If you don't see the email, you can
          <button
            onClick={handleVerify}
            className={classes.BackgroundlessButton}
          >
            Resend it
          </button>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
  userName: state.userName,
});

const mapDispatchToProps = {
  sendEmail: () => actions.sendVerificationEmail(true),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ValidatePage);
