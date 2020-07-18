export const updateErrorOnSubmit = dispatchError => errorFromDynamicFormValidationOnSubmit => {
  dispatchError({
    type: "UPDATE_ERROR_ON_SUBMIT",
    newState: errorFromDynamicFormValidationOnSubmit
  });
};
