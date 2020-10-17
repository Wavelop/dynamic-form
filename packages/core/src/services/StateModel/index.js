import { uuid4 } from "../../utils";

export const groupByRows = config => state => {
  const copyOfModelState = { ...state };
  const stateGroupedByRows = {};

  config.forEach(configElement => {
    const { tag, name, fields } = configElement;
    if (tag === "row") {
      stateGroupedByRows[name] = groupByRows(fields)(copyOfModelState);
    } else {
      stateGroupedByRows[name] = copyOfModelState[name];
    }
  });

  return stateGroupedByRows;
};

export const stateModel = () => {

  const instances = {};

  function init () {
      const service = () => {
          let state = {};

          function get() {
              return {...state};
          }

          function set(newState) {
                state = newState;
          }

          return {
              get,
              set,
          };
      };

      const id = uuid4();
      const serviceClosure = service();

      instances[id] = serviceClosure;

      return {
          id,
          service: serviceClosure
      };
  }

  function get(id) {
      if (id && instances[id]) {
          return instances[id];
      }

      if (!id) {
          throw new Error("id is mandatory");
      }

      throw new Error(`id (${id}) doesn't exist`);
  }

  function remove(id) {
      if(id && instances[id]) {
          delete instances[id];

          return;
      }

      if (!id) {
          throw new Error("id is mandatory");
      }

      throw new Error(`id (${id}) doesn't exist`);
  }

  return {
      init,
      get, 
      remove,
  };
};