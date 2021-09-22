import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Layouts/Layout";
// import Control from "./Control";
import { connect, ConnectedProps } from "react-redux";
import { State } from "./Types";
// import LandingPage from "./Containers/LandingPage/LandingPage";
import { Route, Switch } from "react-router-dom";
import Spinner from "./Components/Spinner/Spinner";

const Control = React.lazy(() => import("./Control"));
const LandingPage = React.lazy(
  () => import("./Containers/LandingPage/LandingPage")
);

const App = (props: PropsFromRedux) => {
  // const view = props.user ? <Control /> : <LandingPage />;

  return (
    <div className="App" style={{ height: `100vh` }}>
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/app" component={Control} exact />
            <Route path="/" component={LandingPage} exact />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
