import React from "react";
import { DynamicFormProvider } from "../DynamicForm";

const withProvider = attributes => WrappedComponent => {
  class WithProvider extends React.Component {
    render() {
      return (
        <DynamicFormProvider {...attributes}>
          <WrappedComponent {...this.props} />
        </DynamicFormProvider>
      );
    }
  }

  return WithProvider;
};

export default withProvider;
