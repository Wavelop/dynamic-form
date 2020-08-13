/* global CONFIG */
import React, { createContext, useContext, useReducer } from "react";
import detectBrowserLanguage from "detect-browser-language";

import {
  getCurrentLanguage,
  setCurrentLanguage,
  getFallbackLanguage,
  setFallbackLanguage,
  getLanguages,
  setLanguages,
  getFlags,
  getTranslations,
  setTranslations,
  t
} from "./Translate";

// Get configuration
const { i18n: i18nConfig } = CONFIG;
const { fallBacklanguage, languages } = i18nConfig;

// Init language properties

setCurrentLanguage(
  languages.indexOf(detectBrowserLanguage().split("-")[0]) !== -1
    ? detectBrowserLanguage().split("-")[0]
    : fallBacklanguage
);
setFallbackLanguage(fallBacklanguage);
setLanguages(languages);

// Contexts
const TranslateContext = createContext();
const TranslateStateContext = createContext();
const TranslateDispatchContext = createContext();

// Reducers
function translateReducer(state, action) {
  switch (action.type) {
    case "CHANGE_LANGUAGE": {
      setCurrentLanguage(action.language);
      return { ...state, language: action.language };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const TranslateProvider = props => {
  const value = {
    getCurrentLanguage: props.getCurrentLanguage || getCurrentLanguage,
    setCurrentLanguage: props.setCurrentLanguage || setCurrentLanguage,
    getFallbackLanguage: props.getFallbackLanguage || getFallbackLanguage,
    setFallbackLanguage: props.setFallbackLanguage || setFallbackLanguage,
    getLanguages: props.getLanguages || getLanguages,
    setLanguages: props.setLanguages || setLanguages,
    getFlags: props.getFlags || getFlags,
    getTranslations: props.getTranslations || getTranslations,
    setTranslations: props.setTranslations || setTranslations,
    t: props.t || t
  };
  const [state, dispatch] = useReducer(translateReducer, {
    language:
      languages.indexOf(detectBrowserLanguage().split("-")[0]) !== -1
        ? detectBrowserLanguage().split("-")[0]
        : fallBacklanguage
  });

  return (
    <TranslateContext.Provider value={value}>
      <TranslateStateContext.Provider value={state}>
        <TranslateDispatchContext.Provider value={dispatch}>
          {props.children}
        </TranslateDispatchContext.Provider>
      </TranslateStateContext.Provider>
    </TranslateContext.Provider>
  );
};

export const useTranslate = () => {
  // You can use the function of provider
  const context = useContext(TranslateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
};

export const useTranslateState = () => {
  const context = useContext(TranslateStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
};

export const useTranslateDispatch = () => {
  const context = useContext(TranslateDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }
  return context;
};
