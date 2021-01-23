import { validate } from "../";

export const updateErrors = config => stateFromService => {
  let errorsObj = {};

  config.forEach(componentConfig => {
    const { name, validations, tag, fields } = componentConfig;
    const copyOfModelState = { ...stateFromService };
    const data = copyOfModelState[name];

    if (tag === "row") {
      errorsObj = { ...errorsObj, ...updateErrors(fields)(copyOfModelState) };
    } else {
      errorsObj[name] = [];
      validations &&
        validations.forEach(validation => {
          let validationResult = validate(validation, data === 0 ? data : data || "", copyOfModelState);
          if (validationResult) {
            errorsObj[name].push(validation);
          }
        });
    }
  });

  return errorsObj;
};
