import React, { createContext, useContext, useReducer } from "react";
import deafultTheme from "../../theme";
import { getConfig, updateErrors, getDomElement } from "../";

// Contexts
const DynamicFormModelStateContext = createContext();
const DynamicFormModelDispatchContext = createContext();
const DynamicFormErrorStateContext = createContext();
const DynamicFormErrorDispatchContext = createContext();
const DynamicFormStyleContext = createContext();
const DynamicFormHelperContext = createContext();

// TODO: creare un sistema che sia non globale in questo modo
let modelState = {};
let errorState = {};

let encryptionLocal = value => value;

const helpers = {
  submit: () => {
    const { _touched } = modelState;
    const copyOfModelState = { ...modelState };
    let copyOfErrorState = { ...errorState };

    delete copyOfModelState._metadata;
    delete copyOfModelState._touched;
    delete copyOfErrorState._globalErrors;
    delete copyOfErrorState._showError;

    console.log(modelState);
    // aggiornare l'error state ora sdds
    console.log(errorState);

    if (!_touched) {
      // TODO: validare lo stato
      console.log("devo popolare errorstate");
      copyOfErrorState = updateErrors(getConfig())(copyOfModelState); // Necessario se ho l'elemento nel DOM?

      getDomElement().current.validateAll();
    } else {
      console.log("error state è già popolato correttamente!");
    }

    let result = {};

    if (Object.keys(copyOfErrorState).length === 0) {
      result = {
        state: copyOfModelState,
        stateCrypted: applyCrypt2State(copyOfModelState, getConfig()), // TODO: cryptare
        stateFull: modelState
      };
    } else {
      result = {
        globalErrors: errorState._globalErrors,
        errors: copyOfErrorState
      };
    }

    console.log(result);

    return result;
  }
};

// Reducers
function dynamicFormModelReducer(state, action) {
  const { type, newState, metadata } = action;

  switch (type) {
    case "UPDATE_MODEL": {
      const newStateLocal = {
        ...state,
        ...newState,
        _metadata: metadata,
        _touched: true
      };

      // Aggiornare provider di stato

      modelState = newStateLocal; // TODO:

      return newStateLocal;
    }
    case "SETUP_MODEL": {
      const newStateLocal = {
        ...state,
        ...newState,
        _metadata: metadata
      };

      // Aggiornare provider di stato

      modelState = newStateLocal; // TODO:

      return newStateLocal;
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

      errorState = errorSummary; // TODO:

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
  _metadata: false,
  _touched: false
};

export const DynamicFormProvider = props => {
  const { encryption, customTheme, children } = props || {};

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

  return (
    <DynamicFormHelperContext.Provider value={helpers}>
      <DynamicFormStyleContext.Provider
        value={{ ...deafultTheme, ...customTheme }}
      >
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
    </DynamicFormHelperContext.Provider>
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
      if (!type && !version) {
        contextDynamic = DynamicFormHelperContext;
      } else {
        throw new Error("Your combination of type and version is not allowed.");
      }
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
  const copyState = { ...state };
  config &&
    Array.isArray(config) &&
    config.length > 0 &&
    config.forEach(configObj => {
      if (configObj.crypt !== undefined && configObj.crypt === true) {
        copyState[configObj.name] = encryptionLocal(copyState[configObj.name]);
      }
    });
  return copyState;
};
