import React, { useState } from "react";
import { auth } from "../../Firebase";
import icons from "url:../../bootstrap-icons/bootstrap-icons.svg";
import classes from "./MainMenu.module.css";
// import DbContext from "../../Context/DbContext";
import Aux from "../../hoc/Auxiliary";
import { Menu, MenuItem } from "@material-ui/core";
import * as actions from "../../Store/Actions/ActionsIndex";
import { connect, ConnectedProps } from "react-redux";
import LoginModal from "../LoginModal/LoginModal";
import { State } from "../../Types";

const MainMenu = (props: PropsFromRedux) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);

  // const userDb = useContext(DbContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setDisplayMenu(true);
  };

  const handleSignout = () => {
    // console.log(`signout 1`);
    props.noActiveUser();
    auth
      .signOut()
      .then(() => {
        // console.log(`signout complete 3`);
        window.location.href = "/";
        setDisplayMenu(false);
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    // console.log(`login`);
    setDisplayMenu(false);
    setModalDisplay(true);
  };

  return (
    <Aux>
      <button className={classes.MainMenu} onClick={handleClick}>
        <svg
          // style={{ color: userDb ? `rgb(0, 185, 56)` : `rgb(48, 48, 48)` }}
          width="30"
          height="30"
          fill="currentColor"
        >
          <use href={`${icons}#list`} />
        </svg>
      </button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={displayMenu}
        onClose={() => setDisplayMenu(false)}
      >
        {!props.user ? (
          <MenuItem onClick={handleLogin}>Login</MenuItem>
        ) : (
          <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
        )}
      </Menu>
      <LoginModal
        handleClose={() => setModalDisplay(false)}
        show={modalDisplay}
      />
    </Aux>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const mapDispatchToProps = {
  activeUser: () => actions.loginSuccess(),
  noActiveUser: () => actions.logout(),
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MainMenu);
