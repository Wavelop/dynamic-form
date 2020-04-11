import React, { createContext, useContext, useReducer } from "react";

// Contexts
const ApplicationStateContext = createContext();
const ApplicationDispatchContext = createContext();

// Reducers
function applicationReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE": {
      return { ...state, title: action.title };
    }
    case "UPDATE_UID": {
      return { ...state, uid: action.uid };
    }
    case "UPDATE_SIGNUP_EMAIL": {
      return { ...state, signupEmail: action.signupEmail };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const initialState = {
  title: null,
  signupEmail: null,
  uid: null
};

export const ApplicationProvider = props => {

  const [state, dispatch] = useReducer(applicationReducer, initialState);
  const {children} = props;

  return (
      <ApplicationStateContext.Provider value={state}>
        <ApplicationDispatchContext.Provider value={dispatch}>
          {children}
        </ApplicationDispatchContext.Provider>
      </ApplicationStateContext.Provider>
  );
};

export const useApplicationState = () => {
  const context = useContext(ApplicationStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a ApplicationProvider");
  }
  return context;
}

export const  useApplicationDispatch = () => {
  const context = useContext(ApplicationDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a ApplicationProvider");
  }
  return context;
}