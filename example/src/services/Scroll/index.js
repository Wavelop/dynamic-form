import React, { createContext, useContext } from "react";

const ScrollContext = createContext(null);
let elementContainerWithScroll = null;

export const ScrollProvider = props => {
  const value = {
    setContainer: props.setContainer || setContainer,
    scrollAction: props.scrollAction || scrollAction,
  };

  return (
    <ScrollContext.Provider value={value}>{props.children}</ScrollContext.Provider>
  );
};

export const useScroll = () => {
  return useContext(ScrollContext);
};

const setContainer = (element) => {
  elementContainerWithScroll = element;
};

const scrollAction = ({x, y}) => {
  elementContainerWithScroll.scrollTo(x, y);
};