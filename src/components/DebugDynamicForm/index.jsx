// NPM dependencies
import React, { useMemo } from "react";

// Application dependencies
import { useDynamicForm, useTheme } from "../../services";
import { useStyles } from "./style";

// Debug
let renderCountDebugDynamicForm = 1;

function DebugDynamicForm() {
  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");
  const theme = useTheme();
  const classes = useStyles(theme)();
  const { background: backgroundStyle } = classes || {};

  const printCounter = () => {
    renderCountDebugDynamicForm++;
    console.table({
      "From file": "src/dynamicForm/components/DebugDynamicForm/index.js",
      "Render count": renderCountDebugDynamicForm
    });
  };

  const renderComponent = () => {
    printCounter();

    return (
      <span>
        <pre className={backgroundStyle}>
          <span>stateFromService</span>
          {JSON.stringify(stateFromService, undefined, 2)}
        </pre>

        <pre className={backgroundStyle}>
          <span>errorFromService</span>
          {JSON.stringify(errorFromService, undefined, 2)}
        </pre>
      </span>
    );
  };

  return useMemo(renderComponent, [stateFromService, errorFromService]);
}

export default DebugDynamicForm;
