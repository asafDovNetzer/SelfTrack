import React from "react";
// import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
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
    console.log(selected);
    props.onSelect(selected);
  };

  return (
    <Aux>
      <button onClick={goToLanding} className={classes.Header}>
        Selfi
      </button>
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
            Data
          </button>
        </Auxiliary>
      )}
      {props.user ? (
        <button onClick={signoutHandler} className={classes.MenuItem}>
          Sign out
        </button>
      ) : (
        <button onClick={signupHandler} className={classes.MenuItem}>
          Sign up
        </button>
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
};

export default connector(MainMenu);
