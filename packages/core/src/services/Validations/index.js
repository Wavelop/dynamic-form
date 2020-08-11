export const fatherValdiations = ["equalfield"];

export const validate = (validation, data) => {
  let error = false;
  switch (validation.kind) {
    case "required":
      error = requiredValidation(data);
      break;
    case "pattern":
      error = patternValidation(data, validation.reg, validation.considerRegAs);
      break;
    case "minlength":
      error = minLengthValidation(data, validation.value);
      break;
    case "maxlength":
      error = maxLengthValidation(data, validation.value);
      break;
    case "validobject":
      error = validAObjectValidation(data, validation.value);
      break;
    case "equalfield":
      error = fatherValidation();
      break;
    case "equalfield:father":
      error = equalfieldValidation(data, validation.valueToCompare);
      break;
    default:
      error = false;
      break;
  }

  return error;
};

const fatherValidation = () => {
  return null;
};

const requiredValidation = data => {
  let error = false;
  if (
    data === "" ||
    data === false ||
    (Array.isArray(data) && data.length === 0)
  ) {
    error = true;
  }
  return error;
};

const minLengthValidation = (data, value) => {
  let error = false;
  if (data.length < value) {
    error = true;
  }
  return error;
};

const maxLengthValidation = (data, value) => {
  let error = false;
  if (data.length > value) {
    error = true;
  }
  return error;
};

const validAObjectValidation = data => {
  let error = false;
  if (typeof data !== "object") {
    error = true;
  }
  return error;
};

const patternValidation = (data, reg, considerRegAs) => {
  let error = false;

  if (data && data !== "") {
    let check = data.match(reg);
    error = check && check.length > 0 ? true : false;
    if (considerRegAs === "positive") {
      error = !error;
    }
  }

  return error;
};

const equalfieldValidation = (data, valueToCompare) => {
  let error = false;
  // null is the initial state
  if (data !== null && valueToCompare !== null && data !== valueToCompare) {
    error = true;
  }
  return error;
};
