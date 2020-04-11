export const dataCoverterHandler = (data, config) => {
    let dataConverted = data;
    if (
      config.dataManipulatorIn &&
      typeof config.dataManipulatorIn === "function" &&
      data !== ""
    ) {
      dataConverted = config.dataManipulatorIn(data);
    }
    return dataConverted;
  };