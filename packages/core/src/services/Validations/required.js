export default required = data => {
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