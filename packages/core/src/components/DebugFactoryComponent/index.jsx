// NPM dependencies
import React from "react";
import PropTypes from "prop-types";

// Application dependencies

// Debug
let renderCountDebugFactoryComponent = 1;

function DebugFactoryComponent(props) {
  const { state, model, error } = props;

  const printCounter = () => {
    renderCountDebugFactoryComponent++;
    console.table({
      "From file": "src/dynamicForm/components/DebugFactoryComponent/index.js",
      "Render count": renderCountDebugFactoryComponent
    });
  };

  const renderComponent = () => {
    printCounter();

    return (
      <span>
        <pre>
          <div>DynamicForm</div>
          <div>defaultValue: {JSON.stringify(model || null, undefined, 2)}</div>
          <div>Current value: {JSON.stringify(state || {}, undefined, 2)}</div>
          <div>Errors: {JSON.stringify(error || [], undefined, 2)}</div>
        </pre>
      </span>
    );
  };

  return renderComponent();
}

DebugFactoryComponent.propTypes = {
  state: PropTypes.any
};

export default DebugFactoryComponent;
