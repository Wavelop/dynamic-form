import { validate } from "../../../services"; 

export const updateError = (config, updateModelAtBlur, dispatchError) => (stateFromService) => {

  const { _metadata: metadata} = stateFromService || {};
  const {lastEvent} = metadata || {};

  let errorsObj = {};

  config.forEach((componentConfig) => {
    const {name, validations} = componentConfig;
    const data = stateFromService[name];

    errorsObj[name] = [];

    (data || data === "") && validations &&
    validations.forEach(validation => {
      let validationResult = validate(validation, data);
      if (validationResult) {
        errorsObj[name].push(validation);
      }
    });

  }); 

  if (
    (lastEvent === "onChange" &&
      (!updateModelAtBlur || updateModelAtBlur === undefined)
    ) ||
    lastEvent === "onBlur"
  ) {
    dispatchError({
      type: "UPDATE_ERROR",
      newState: errorsObj,
    });
  }
  
};
