import React, { createContext, useContext, useMemo, useState } from "react";
import { Spinner } from "Components";

const SpinnerContext = createContext(null);

const initialState = {
  visible: false,
  start: null
};

export const SpinnerProvider = props => {
  const { children } = props;
  const [visibleState, setVisible] = useState(initialState);

  const spinner = useMemo(
    () => ({
      show: () =>
        setVisible({
          visible: true,
          start: new Date()
        }),
      hide: (callback = () => {}) => {
        const { start } = visibleState;
        const now = new Date();

        if (start - now > 1000) {
          setVisible({
            visible: false,
            start: new Date()
          });
          callback();
        } else {
          setTimeout(() => {
            setVisible({
              visible: false,
              start: new Date()
            });
            callback();
          }, 750);
        }
      }
    }),
    [visibleState]
  );

  return (
    <>
      {visibleState && visibleState.visible && <Spinner />}
      <SpinnerContext.Provider value={spinner}>
        {children}
      </SpinnerContext.Provider>
    </>
  );
};

export const useSpinner = () => {
  return useContext(SpinnerContext);
};
