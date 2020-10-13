export const pattern = (data, { reg, negate }) => {
  let error = false;

  if (data && data !== "") {
    let check = data.match(reg);
    error = check && check.length > 0 ? true : false;
    if (negate) {
      error = !error;
    }
  }

  return error;
};