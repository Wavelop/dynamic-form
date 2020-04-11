import React from "react";

const withProvider = (Provider, attributes) => WrappedComponent => {
  class WithProvider extends React.Component {
    render() {
      return (
        <Provider {...attributes}>
          <WrappedComponent />
        </Provider>
      );
    }
  }

  return WithProvider;
};

export default withProvider;
