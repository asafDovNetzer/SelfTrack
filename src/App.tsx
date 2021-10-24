import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Components/Layouts/Layout";
import { connect, ConnectedProps } from "react-redux";
import { State } from "./Types";
import { Route, Switch } from "react-router-dom";
import Spinner from "./Components/Spinner/Spinner";

const Control = React.lazy(() => import("./Control"));
const LandingPage = React.lazy(
  () => import("./Containers/LandingPage/LandingPage")
);
const ValidatePage = React.lazy(
  () => import("./Components/Account/ValidatePage")
);
const AuthPage = React.lazy(() => import("./Containers/AuthPage/AuthPage"));
const CompleteSignupPage = React.lazy(
  () => import("./Components/Account/CompleteSignup")
);

const App = (props: PropsFromRedux) => {
  React.useEffect(() => {
    if (
      props.user &&
      !props.user.emailVerified &&
      window.location.pathname !== "/validate"
    ) {
      window.location.href = "/validate";
    }
  }, [props]);

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/app" component={Control} exact />
            <Route path="/signup" component={AuthPage} />
            <Route path="/login" component={AuthPage} />
            <Route path="/validate" component={ValidatePage} exact />
            <Route
              path="/complete-signup"
              component={CompleteSignupPage}
              exact
            />
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
