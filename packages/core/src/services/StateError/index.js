export const stateError = () => {

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

      const id = uuidv4();
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

  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  return {
      init,
      get, 
      remove,
  };
};