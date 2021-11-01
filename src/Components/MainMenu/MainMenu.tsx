import React from "react";
import classes from "./MainMenu.module.css";
import Aux from "../../hoc/Auxiliary";
import * as actions from "../../Store/Actions/ActionsIndex";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../Types";
import { signOut, getAuth } from "firebase/auth";
import Auxiliary from "../../hoc/Auxiliary";

const MainMenu = (props: Props) => {
  const [didSignout, setDidSignout] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!props.user && didSignout) {
      window.location.href = "/";
    }
  }, [didSignout, props.user]);

  const goToLanding = () => {
    window.location.href = "/";
  };

  const signupHandler = () => {
    props.onSignup();
  };

  const signoutHandler = () => {
    props.onSignout();
    const auth = getAuth();
    signOut(auth).then(() => {
      setDidSignout(true);
    });
  };

  const handleSelect = (selected: string) => {
    props.onCloseSidedrawer();
    props.onSelect(selected);
  };

  const scrollTo = (event: any) => {
    console.log(event.target.name);
    const el = document.querySelector(`.${event.target.name}`);
    console.log(el);
    el?.scrollIntoView({ behavior: `smooth` });
  };

  return (
    <Aux>
      <div className={classes.LogoCont}>
        {props.displayMenu || window.location.pathname !== `/` ? (
          <button onClick={goToLanding}>
            <img
              className={classes.Logo}
              src={`./Images/logo7.svg`}
              alt="Stableyez"
            />
          </button>
        ) : null}
      </div>
      {props.user && window.location.pathname === `/app` && (
        <Auxiliary>
          <button
            onClick={() => handleSelect(`trackers`)}
            className={`${classes.MenuItem} ${
              props.selectedView === `trackers` ? classes.Active : ``
            }`}
          >
            Trackers
          </button>
          <button
            onClick={() => handleSelect(`data`)}
            className={`${classes.MenuItem} ${
              props.selectedView === `data` ? classes.Active : ``
            }`}
          >
            Insight
          </button>
        </Auxiliary>
      )}
      {window.location.pathname === `/` ? (
        <Auxiliary>
          <button
            name="second-view"
            onClick={scrollTo}
            className={classes.MenuItem}
          >
            Why Us
          </button>
          <button
            name="how-view"
            onClick={scrollTo}
            className={classes.MenuItem}
          >
            How it Works
          </button>
        </Auxiliary>
      ) : null}
      {props.user ? (
        <button onClick={signoutHandler} className={classes.MenuItem}>
          Sign out
        </button>
      ) : (
        <Auxiliary>
          <button onClick={signupHandler} className={classes.MenuItem}>
            Sign up
          </button>
        </Auxiliary>
      )}
    </Aux>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
  selectedView: state.selectedView,
});

const mapDispatchToProps = {
  onSignout: () => actions.logout(),
  onSelect: (selected: string) => actions.goTo(selected),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  onSignup: () => void;
  onCloseSidedrawer: () => void;
  displayMenu: boolean;
};

export default connector(MainMenu);
