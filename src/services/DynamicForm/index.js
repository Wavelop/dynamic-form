import React, { createContext, useContext, useReducer } from "react";
import deafultTheme from "../../theme";

// Contexts
const DynamicFormModelStateContext = createContext();
const DynamicFormModelDispatchContext = createContext();
const DynamicFormErrorStateContext = createContext();
const DynamicFormErrorDispatchContext = createContext();
const DynamicFormStyleContext = createContext();

let encryptionLocal = value => value;

// Reducers
function dynamicFormModelReducer(state, action) {
  const { type, newState, metadata } = action;

  switch (type) {
    case "UPDATE_MODEL": {
      return {
        ...state,
        ...newState,
        _metadata: metadata
        // something
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function dynamicFormErrorReducer(state, action) {
  const { type, newState } = action;
  switch (type) {
    case "UPDATE_ERROR": {
      let _globalErrors = 0;

      let errorSummary = {
        ...state,
        ...newState
        // something
      };

      let showError = errorSummary._showError;

      delete errorSummary._globalErrors;
      delete errorSummary._showError;

      Object.keys(errorSummary).forEach(element => {
        _globalErrors += errorSummary[element].length;
      });

      errorSummary["_globalErrors"] = _globalErrors;
      errorSummary["_showError"] = showError;

      return errorSummary;
    }
    case "SHOW_ERROR": {
      return {
        ...state,
        _showError: !state._showError
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Initial states
const initialStateError = {
  _showError: false
};

const initialStateModel = {
  _metadata: false
};

export const DynamicFormProvider = props => {
  const { encryption, customTheme } = props || {};

  if (encryption && typeof encryption === "function") {
    encryptionLocal = encryption;
  }

  const [stateModel, dispatchModel] = useReducer(
    dynamicFormModelReducer,
    initialStateModel
  );
  const [stateError, dispatchError] = useReducer(
    dynamicFormErrorReducer,
    initialStateError
  );

  const { children } = props;

  return (
    <DynamicFormStyleContext.Provider value={{...deafultTheme, ...customTheme}}>
      <DynamicFormModelStateContext.Provider value={stateModel}>
        <DynamicFormModelDispatchContext.Provider value={dispatchModel}>
          <DynamicFormErrorStateContext.Provider value={stateError}>
            <DynamicFormErrorDispatchContext.Provider value={dispatchError}>
              {children}
            </DynamicFormErrorDispatchContext.Provider>
          </DynamicFormErrorStateContext.Provider>
        </DynamicFormModelDispatchContext.Provider>
      </DynamicFormModelStateContext.Provider>
    </DynamicFormStyleContext.Provider>
  );
};

export const useDynamicForm = (type, version) => {
  let contextDynamic = null;

  switch (version) {
    case "error":
      if (type === "state") {
        contextDynamic = DynamicFormErrorStateContext;
      } else if (type === "dispatch") {
        contextDynamic = DynamicFormErrorDispatchContext;
      }

      break;

    case "model":
      if (type === "state") {
        contextDynamic = DynamicFormModelStateContext;
      } else if (type === "dispatch") {
        contextDynamic = DynamicFormModelDispatchContext;
      }

      break;

    default:
      throw new Error("Your combination of type and version is not allowed.");
  }

  if (contextDynamic === null) {
    throw new Error("Your combination of type and version is not allowed.");
  }

  const context = useContext(contextDynamic);
  if (context === undefined) {
    throw new Error("this function must be used within a provider");
  }
  return context;
};

export const useTheme = () => {
  const context = useContext(DynamicFormStyleContext);
  
  if (context === undefined) {
    throw new Error("this function must be used within a provider");
  }
  return context;
};

export const applyCrypt2State = (state, config) => {
  config &&
    Array.isArray(config) &&
    config.length > 0 &&
    config.forEach(configObj => {
      if (configObj.crypt !== undefined && configObj.crypt === true) {
        state[configObj.name] = encryptionLocal(state[configObj.name]);
      }
    });
};
