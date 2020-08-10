export const setupModel = (config, dispatchModel, dataCoverterHandler) => {
  let modelObj = {};

  config.forEach(componentConfig => {
    const { name, defaultValue, tag } = componentConfig;
    if (tag !== "row") {
      const initialValue =
        defaultValue !== undefined && defaultValue !== null
          ? defaultValue
          : null;
      modelObj[name] = dataCoverterHandler(initialValue, componentConfig);
    }
  });

  dispatchModel({
    type: "SETUP_MODEL",
    newState: modelObj
  });
};
