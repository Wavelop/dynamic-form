export const equalfield = (data, valueToCompare) => {
  let error = false;
  // null is the initial state
  if (data !== null && valueToCompare !== null && data !== valueToCompare) {
    error = true;
  }
  return error;
};
