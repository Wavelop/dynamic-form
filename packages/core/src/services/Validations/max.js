export const max = (data, { value }) => {
  let error = false;
  const parsed = parseInt(data);
  if (!isNaN(parsed)) { 
    if (parsed > value) {
      error = true;
    }
  } else {
    error = true;
  }
  return error;
};