import React from "react";
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
// import Footer from "../Footer/Footer";

const Layout: React.FC = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main>{props.children}</main>
      <ErrorModal />
      {/* <Footer /> */}
    </Aux>
  );
};

export default Layout;
