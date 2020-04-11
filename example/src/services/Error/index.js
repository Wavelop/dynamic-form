import React, { createContext, useContext } from "react";

const ErrorContext = createContext(null);

export const ErrorProvider = props => {
  const value = {
    getError: props.getError || getError
  };

  return (
    <ErrorContext.Provider value={value}>
      {props.children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  return useContext(ErrorContext);
};

const getError = (
  error,
  customAvailableErrorAdd = [],
  customAvailableError = null
) => {
  let availableError = [
    "email-already-verified",
    "email-generic-error",
    "empty-fields",
    "expired-token",
    "facebook-idp-server-error",
    "form-invalid",
    "generic-service-error",
    "google-idp-server-error",
    "invalid-code",
    "invalid-credentials",
    "invalid-email",
    "invalid-parameters",
    "invalid-parameters",
    "invalid-password",
    "invalid-refresh-token",
    "invalid-request",
    "invalid-reset-code",
    "invalid-thread",
    "invalid-token",
    "invalid-verification-code",
    "malformed-token",
    "not-allowed",
    "notification-api-generic-error",
    "notification-template-not-found",
    "oidc-server-error",
    "password-already-used",
    "password-not-equal",
    "permission-denied",
    "token-not-found",
    "user-already-exist",
    "user-not-enabled",
    "user-not-exists",
    "username-already-used",
    "validation-error",
    "no-code-found",
    "empty-email",
    "different-password",
    "empty-password",
    "wrong-email",
    ...customAvailableErrorAdd
  ];

  if (customAvailableError !== null) {
    availableError = customAvailableError;
  }

  return availableError.indexOf(error) !== -1;
};
