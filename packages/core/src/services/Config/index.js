let configGlobal = {};
let updateError = null;

export const saveConfig = config => {
  configGlobal = config;
};

export const saveUpdateError = updateErrorFn => {
  updateError = updateErrorFn;
};

export const getConfig = () => {
  return configGlobal;
};

export const getUpdateError = () => {
  return updateError;
};
