import { validate } from "../../../services";

export const updateError = (config, updateModelAtBlur, dispatchError) => (
  stateFromService,
  errorFromService
) => {
  const { _metadata: metadata } = stateFromService || {};
  const { lastEvent, lasteElementTouched } = metadata || {};

  let errorsObj = { ...errorFromService };

  config.forEach(componentConfig => {
    const { name, validations } = componentConfig;
    const data = stateFromService[name];

    if (
      (lasteElementTouched === name || lasteElementTouched === null) &&
      (data || data === "")
    ) {
      errorsObj[name] = [];
    }

    (lasteElementTouched === name || lasteElementTouched === null) &&
      (data || data === "") &&
      validations &&
      validations.forEach(validation => {
        let validationResult = validate(validation, data);
        if (validationResult) {
          errorsObj[name].push(validation);
        }
      });
  });

  debugger;
  if (
    (lastEvent === "onChange" &&
      (!updateModelAtBlur || updateModelAtBlur === undefined)) ||
    lastEvent === "onBlur"
  ) {
    dispatchError({
      type: "UPDATE_ERROR",
      newState: errorsObj
    });
  }
};
