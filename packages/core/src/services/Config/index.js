let configGlobal = {};
let updateError = [];

export const saveConfig = config => {
  configGlobal = config;
};

export const saveUpdateError = (id, updateErrorFn) => {
  updateError[id] = updateErrorFn;
};

export const getConfig = () => {
  return configGlobal;
};

export const getUpdateError = (id) => {
  console.log(id);
  return id && updateError[id] ? updateError[id] : () => {};
};
