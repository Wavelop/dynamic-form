export const minLength = (data, { value }) => {
  let error = false;
  if (data.length < value) {
    error = true;
  }
  return error;
};