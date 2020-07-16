let configGlobal = {};
let domelement = null;
export const saveConfig = (config, ref) => {
  configGlobal = config;
  domelement = ref;
};

export const getConfig = () => {
  return configGlobal;
};

export const getDomElement = () => {
  return domelement;
};
