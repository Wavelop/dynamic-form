import React, { 
  createContext, 
  useContext, 
  useReducer, 
  useEffect, useState 
} from "react";
import { 
  getConfig, 
  updateErrors, 
  getUpdateError, 
  groupByRows, 
  groupByRowsGroupIn,
  stateModel as stateModelService, 
  stateError as stateErrorService 
} from "../";

// Contexts
const DynamicFormModelStateContext = createContext();
const DynamicFormModelDispatchContext = createContext();
const DynamicFormErrorStateContext = createContext();
const DynamicFormErrorDispatchContext = createContext();
const DynamicFormHelperContext = createContext();

let encryptionLocal = value => value;

const helpers = ({
  stateModelService,
  idStateModel,
  stateErrorService,
  idStateError
}) => {
  return {
    submit: () => {
      const copyOfModelState = { ...stateModelService.get() };
      let copyOfErrorState = { ...stateErrorService.get() };

      let numberOfErrors = 0;

      delete copyOfModelState._metadata;
      delete copyOfErrorState._metadata;

      copyOfErrorState = updateErrors(getConfig(idStateModel))(copyOfModelState);

      // Execute the action UPDATE_ERROR_ON_SUBMIT directily from the service
      getUpdateError(idStateError)(copyOfErrorState);

      Object.keys(copyOfErrorState).forEach(element => {
        numberOfErrors += copyOfErrorState[element].length;
      });

      if (numberOfErrors === 0) {
        return {
          state: copyOfModelState,
          stateCrypted: applyCrypt2State(copyOfModelState, getConfig(idStateModel)),
          stateGroupedByRows: groupByRows(getConfig(idStateModel))(copyOfModelState),
          stateGroupedByRowsGroupIn: groupByRowsGroupIn(getConfig(idStateModel))(copyOfModelState)
        };
      } else {
        throw {
          numberOfErrors,
          errors: copyOfErrorState
        };
      }
    }
  }
};

// Reducers
const dynamicFormModelReducer = (hel) => (state, action) => {

  const { type, newState, metadata } = action;

  switch (type) {
    case "UPDATE_MODEL": {
      const keys = Object.keys(newState || {});
      const numberOfChanges = keys.length;

      let lasteElementTouched = null;

      if (numberOfChanges === 1) {
        lasteElementTouched = keys[0];
      }

      const newStateLocal = {
        ...state,
        ...newState,
        _metadata: {
          ...metadata,
          lasteElementTouched,
          setupModelCompleted: true
        }
      };

      hel && hel.stateModelService && hel.stateModelService.set(newStateLocal);

      return newStateLocal;
    }
    case "SETUP_MODEL": {
      const { _metadata } = state || {};
      const { setupModelCompleted } = _metadata || {};

      if(!setupModelCompleted) { 
        
        const newStateLocal = {
          ...state,
          ...newState,
          _metadata: {
            ...metadata,
            setupModelCompleted: false
          }
        };
        
        hel && hel.stateModelService && hel.stateModelService.set(newStateLocal);
        
        return newStateLocal;
      } else {
        return state;
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const dynamicFormErrorReducer = (hel) => (state, action) => {
  const { type, newState } = action;
  switch (type) {
    case "UPDATE_ERROR":
    case "UPDATE_ERROR_ON_SUBMIT": {
      let numberOfErrors = 0;

      let errorSummary = {
        ...state,
        ...newState
      };

      delete errorSummary._metadata;

      Object.keys(errorSummary).forEach(element => {
        numberOfErrors += errorSummary[element].length;
      });

      errorSummary._metadata = {
        numberOfErrors
      };

      hel && hel.stateErrorService && hel.stateErrorService.set(errorSummary);

      return errorSummary;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Initial states
const initialStateError = {
  _metadata: {}
};

const initialStateModel = {
  _metadata: {}
};

export const DynamicFormProvider = props => {
  const { encryption, children } = props || {};
  const [hel, setHelper] = useState();


  if (encryption && typeof encryption === "function") {
    encryptionLocal = encryption;
  }

  const [stateModel, dispatchModel] = useReducer(
    dynamicFormModelReducer(hel),
    initialStateModel
  );
  const [stateError, dispatchError] = useReducer(
    dynamicFormErrorReducer(hel),
    initialStateError
  );

  useEffect(() => {
    const { service: sm, id: idStateModel } = stateModelService().init();
    const { service: se, id: idStateError } = stateErrorService().init();
    setHelper({ 
      submit: helpers({
        stateModelService: sm,
        idStateModel,
        stateErrorService: se,
        idStateError
      }).submit, 
      stateModelService: sm,
      idStateModel,
      stateErrorService: se,
      idStateError
    })
  }, []);


  return (
    hel ? 
    (<DynamicFormHelperContext.Provider value={hel}>
      <DynamicFormModelStateContext.Provider value={stateModel}>
        <DynamicFormModelDispatchContext.Provider value={dispatchModel}>
          <DynamicFormErrorStateContext.Provider value={stateError}>
            <DynamicFormErrorDispatchContext.Provider value={dispatchError}>
              {children}
            </DynamicFormErrorDispatchContext.Provider>
          </DynamicFormErrorStateContext.Provider>
        </DynamicFormModelDispatchContext.Provider>
      </DynamicFormModelStateContext.Provider>
    </DynamicFormHelperContext.Provider>) :
    (<span /> )
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
