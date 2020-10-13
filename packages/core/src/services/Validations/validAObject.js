export const validAObject = data => {
  let error = false;
  if (typeof data !== "object") {
    error = true;
  }
  return error;
};