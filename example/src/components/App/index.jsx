// import from 3rd party
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Loadable from "react-loadable";

// import from application dependency
import {
  Spinner,
  PublicRoute,
  HelmetTag,
  Layout
} from "Components";

import {
  ApplicationProvider,
  ErrorProvider,
  ScrollProvider
} from "Services";

import { TranslateProvider } from "Translate";

// Loadable init

const Signup = Loadable({
  loader: () =>
    import("Screens").then(screens => {
      return screens.Signup;
    }),
  loading() {
    return <Spinner />;
  }
});

const SignupPreloadData = Loadable({
  loader: () =>
    import("Screens").then(screens => {
      return screens.SignupPreloadData;
    }),
  loading() {
    return <Spinner />;
  }
});

const CustomLayout = Loadable({
  loader: () =>
    import("Screens").then(screens => {
      return screens.CustomLayout;
    }),
  loading() {
    return <Spinner />;
  }
});

const MultipleForm = Loadable({
  loader: () =>
    import("Screens").then(screens => {
      return screens.MultipleForm;
    }),
  loading() {
    return <Spinner />;
  }
});

function App() {
  return (
    <TranslateProvider>
      <ApplicationProvider>
        <ScrollProvider>
          <ErrorProvider>
            <HelmetTag />
            <Layout>
              <Router>
                <Switch>
                  <PublicRoute exact={true} path="/" component={CustomLayout} />
                  <PublicRoute
                    exact={true}
                    path="/signup"
                    component={Signup}
                  />
                  <PublicRoute
                    exact={true}
                    path="/pre"
                    component={SignupPreloadData}
                  />
                  <PublicRoute
                    exact={true}
                    path="/custom-layout"
                    component={CustomLayout}
                  />
                  <PublicRoute
                    exact={true}
                    path="/multiple"
                    component={MultipleForm}
                  />
                </Switch>
              </Router>
            </Layout>
          </ErrorProvider>
        </ScrollProvider>
      </ApplicationProvider>
    </TranslateProvider>
  );
}

export default App;
