export const setupModel = (config, dispatchModel) => {
  let modelObj = {};

  config.forEach(componentConfig => {
    const { name, defaultValue } = componentConfig;
    modelObj[name] =
      defaultValue !== undefined && defaultValue !== null ? defaultValue : null;
  });

  dispatchModel({
    type: "SETUP_MODEL",
    newState: modelObj
  });
};
