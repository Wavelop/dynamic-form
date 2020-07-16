export const updateErrorOnSubmit = dispatchError => errorFromDynamicFormValidationOnSubmit => {
  debugger;
  dispatchError({
    type: "UPDATE_ERROR_ON_SUBMIT",
    newState: errorFromDynamicFormValidationOnSubmit
  });
};
