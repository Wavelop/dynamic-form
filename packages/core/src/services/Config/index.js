let configGlobal = {};
let orderedConfigGlobal = {};
let updateError = [];

export const saveConfig = (mainId, id, config, internal) => {
  if(!configGlobal[mainId]) {
    configGlobal[mainId] = {};
  }
  configGlobal[mainId][id] = config;

  if(!internal) {
    orderedConfigGlobal[mainId] = config;
  }
};

export const saveUpdateError = (id, updateErrorFn) => {
  updateError[id] = updateErrorFn;
};

export const getConfig = (mainId) => {
  if(!mainId) throw new Error("Missing ID");
  return (mainId && orderedConfigGlobal[mainId] && orderedConfigGlobal[mainId]) || {};
};

export const getConfigDetail = (mainId, id) => {
  if(!id && !mainId) return configGlobal;
  if(!id && mainId && configGlobal[mainId]) {
    return configGlobal[mainId];
  }
  if(id && mainId && configGlobal[mainId] && configGlobal[mainId][id]) {
    return configGlobal[mainId][id];
  }
};

export const getUpdateError = (id) => {
  return id && updateError[id] ? updateError[id] : () => {};
};
