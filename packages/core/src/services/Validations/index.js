import { equalTo } from "./equalTo";
import { equalfield } from "./equalfield";
import { max } from "./max";
import { maxLength } from "./maxLength";
import { min } from "./min";
import { minLength } from "./minLength";
import { pattern } from "./pattern";
import { required } from "./required";
import { validAObject } from "./validAObject"; 

export const validations = {
  required,
  equalfield,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  validAObject,
  equalTo
};

/**
 * Facade method for validation
 *
 * @param {*} validation validation configuration
 * @param {*} data the current value to check
 * @param {*} state the entire model state
 * @returns
 */
export const validate = (validation, data, state) => {

  const { kind: validationFunction } = validation;
  let error = false;

  if (typeof validationFunction === "string" && !!validations[validationFunction]) {
    error = validations[validationFunction](data, { ...validation}, state);
  } else if(typeof validationFunction === "function") {
    error = validationFunction(data, { ...validation}, state);
  } else {
    error = false;
  }

  return error;
};