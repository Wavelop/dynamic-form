import { validate } from "../../../services";

export const updateError = (config, updateErrorAtBlur, dispatchError) => (
  stateFromService,
  errorFromService
) => {
  const { _metadata: metadata } = stateFromService || {};
  const { lastEvent, lasteElementTouched } = metadata || {};

  const errorStateCopy = {};

  config.forEach(componentConfig => {
    const { name, tag } = componentConfig;
    if (tag !== "row" && errorFromService[name]) {
      errorStateCopy[name] = errorFromService[name];
    }
  });

  let errorsObj = { ...errorStateCopy };

  config.forEach(componentConfig => {
    const { name, validations, tag } = componentConfig;
    const copyOfModelState = { ...stateFromService };
    const data = stateFromService[name];

    if (tag !== "row") {
      if (
        (lasteElementTouched === name || lasteElementTouched === null || errorFromService[name]) &&
        (data || data === "")
      ) {
        errorsObj[name] = [];
      }

      (lasteElementTouched === name || lasteElementTouched === null || errorFromService[name]) &&
        (data || data === "") &&
        validations &&
        validations.forEach(validation => {
          let validationResult = validate(validation, data, copyOfModelState);
          if (validationResult) {
            errorsObj[name].push(validation);
          }
        });
    }
  });

  if (
    (lastEvent === "onChange" &&
      (!updateErrorAtBlur || updateErrorAtBlur === undefined)) ||
    (lastEvent === "onBlur" && Object.keys(errorsObj).length > 0)
  ) {
    dispatchError({
      type: "UPDATE_ERROR",
      newState: errorsObj
    });
  }
};
