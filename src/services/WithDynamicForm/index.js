import React from "react";
import { DynamicFormProvider } from "../DynamicForm";

// export default withProvider(DynamicFormProvider)(withRouter()(Signup));  // avere withDynnamiForm

const withProvider = attributes => WrappedComponent => {
  class WithProvider extends React.Component {
    render() {
      return (
        <DynamicFormProvider {...attributes}>
          <WrappedComponent />
        </DynamicFormProvider>
      );
    }
  }

  return WithProvider;
};

export default withProvider;
