import React from "react";
// import { auth } from "../../Firebase";
import classes from "./ValidatePage.module.css";
// import UIclasses from "../UI/General.module.css";
import * as actions from "../../Store/Actions/ActionsIndex";
import { connect, ConnectedProps } from "react-redux";
import { useEffect } from "react";
import { State } from "../../Types";
import Divider from "../UI/Divider";
import { sendEmailVerification } from "firebase/auth";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import Spinner from "../Spinner/Spinner";

const ValidatePage = (props: PropsFromRedux) => {
  useEffect(() => {
    if (props.user?.emailVerified) {
      window.location.href = "/";
    }
  }, [props.user]);

  const handleVerify = () => {
    sendEmailVerification(props.user!).then(() => {
      console.log(`email varification sent`);
    });
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
        <p>Please reload once verification is complete</p>
        <button
          className={classes.ReloadButton}
          onClick={() => {
            window.location.href = "/validate";
          }}
        >
          <svg width="30" height="30" fill="currentColor">
            <use href={`${icons}#arrow-counterclockwise`} />
          </svg>
        </button>
        <Divider />
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
  noActiveUser: () => actions.logout(),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ValidatePage);
