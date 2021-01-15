export const dataCoverterHandler = (data, {dataManipulatorIn} = {}) => {
  let dataConverted = data;

  if (
    dataManipulatorIn &&
    typeof dataManipulatorIn === "function" &&
    data !== ""
  ) {
    dataConverted = dataManipulatorIn(data);
  }
  return dataConverted;
};
