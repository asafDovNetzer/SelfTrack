import React from "react";
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
// import Footer from "../Footer/Footer";

const Layout: React.FC = (props) => {
  return (
    <Aux>
      <Toolbar />
      <main>{props.children}</main>
      {/* <Footer /> */}
    </Aux>
  );
};

export default Layout;
