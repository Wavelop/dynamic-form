import * as React from 'react';
import { Redirect, Route } from 'react-router';


export default class PrivateRoute extends Route {
  
  render() {
    let redirectPath = false;
    
    // Logic to redirect
    // this.props.redirectPath

    if (redirectPath) {
      const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
      return <Route {...this.props} component={renderComponent} render={undefined} />;
    } else {
      return <Route {...this.props} />;
    }
  }
}
