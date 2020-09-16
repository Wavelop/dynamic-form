import required from "./required";
import equalfield from "./equalfield";
import maxLength from "./maxLength";
import minLenght from "./minLength";
import pattern from "./pattern";
import validAObject from "./validAObject"; 

const defaultValidation = {
  required,
  equalfield,
  maxLength,
  minLenght,
  pattern,
  validAObject
};

/**
 * Facade method for validation
 *
 * @param {*} validation validation configuration
 * @param {*} data the current value to check
 * @param {*} state the entire model state
 * @returns
 */
const validate = (validation, data, state) => {

  const { kind: validationFunction } = validation;
  let error = false;

  if (typeof validationFunction === "string" && !!defaultValidation[validationFunction]) {
    error = defaultValidation[validationFunction](data, { ...validation}, state);
  } else if(typeof validationFunction === "function") {
    error = validationFunction(data, { ...validation}, state);
  } else {
    error = false;
  }

  return error;
};