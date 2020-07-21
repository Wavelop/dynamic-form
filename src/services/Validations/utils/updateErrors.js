import { validate } from "../";

export const updateErrors = config => stateFromService => {
  let errorsObj = {};

  config.forEach(componentConfig => {
    const { name, validations } = componentConfig;
    const data = stateFromService[name];

    errorsObj[name] = [];

    validations &&
      validations.forEach(validation => {
        let validationResult = validate(validation, data || "");
        if (validationResult) {
          errorsObj[name].push(validation);
        }
      });
  });

  return errorsObj;
};
