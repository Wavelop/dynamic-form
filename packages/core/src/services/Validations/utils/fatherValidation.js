import { fatherValdiations } from "../index";
/**
 *
 *
 * @param {array} value
 * @returns
 */
export const fatherValidationFounder = value => {
  return !!value.find(validation => {
    return fatherValdiations.indexOf(validation.kind) !== -1;
  });
};

export const isFatherValidation = validation => {
  return fatherValdiations.indexOf(validation) !== -1;
};
