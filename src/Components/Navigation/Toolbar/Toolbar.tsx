import React from "react";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
// import UIclasses from "../../UI/General.module.css";
import MainMenu from "../../MainMenu/MainMenu";
import classes from "./Toolbar.module.css";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../../Types";
import Modal from "../../UI/Modal/Modal";
import AuthModal from "../../AuthModals/AuthModal";
import SideDrawer from "../../UI/SideDrawer/SideDrawer";

const Toolbar = (props: PropsFromRedux) => {
  const [displayUserModal, setDisplayUserModal] =
    React.useState<boolean>(false);

  const [displayMenu, setDisplayMenu] = React.useState<boolean>(false);

  const [slide, setSlide] = React.useState<number>(500);

  React.useEffect(() => {
    const toolbar = document.querySelector(`.toolbar`);
    const header = document.querySelector(`.header`);

    if (!toolbar || !header) return;

    const stickyNav = function (entries: any) {
      const [entry] = entries;
      // console.log(entry);
      if (!entry.isIntersecting) {
        toolbar.classList.add(classes.Sticky);
      } else {
        toolbar.classList.remove(classes.Sticky);
      }
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-56px`,
    });

    headerObserver.observe(header);
  }, []);

  const goToApp = () => {
    window.location.href = "/app";
  };

  const handleLoginButton = () => {
    if (window.innerWidth > 500) {
      setSlide(500);
      setDisplayUserModal(true);
    } else {
      window.location.href = `/login`;
    }
  };

  const handleSignupButton = () => {
    if (window.innerWidth > 500) {
      setSlide(0);
      setDisplayUserModal(true);
    } else {
      window.location.href = `/signup`;
    }
  };

  return (
    <div className={`${classes.Header} header`}>
      <div
        className={`${classes.Toolbar} toolbar`}
        // style={{ position: sticky ? `fixed` : `unset` }}
      >
        <div
          className={classes.MenuButton}
          onClick={() => setDisplayMenu(true)}
        >
          <svg width="30" height="30" fill="currentColor">
            <use href={`${icons}#list`} />
          </svg>
        </div>
        <div className={classes.Menu}>
          <MainMenu onSignup={handleSignupButton} />
        </div>
        <div>
          {props.user?.emailVerified && window.location.pathname !== `/app` ? (
            <button className={classes.MainButton} onClick={goToApp}>
              App
            </button>
          ) : null}
          {!props.user && window.location.pathname === `/` ? (
            <button onClick={handleLoginButton} className={classes.MainButton}>
              Login
            </button>
          ) : null}
        </div>
        <Modal
          show={displayUserModal && !props.user}
          onHide={() => setDisplayUserModal(false)}
        >
          <AuthModal slide={slide} />
        </Modal>
        <SideDrawer show={displayMenu} onHide={() => setDisplayMenu(false)}>
          <MainMenu onSignup={handleSignupButton} />
        </SideDrawer>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Toolbar);
