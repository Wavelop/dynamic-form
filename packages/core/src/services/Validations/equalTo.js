import { flatten } from "./utils/flatten";

export const equalTo = (data, { to }, state) => {
    let error = false;
    const flattenState = flatten(state || {});

    if(!to) {
        throw new Error("to field is mandatory for this validation");
    }

    if (data && data !== "" && flattenState[to] && flattenState[to] !== "") {
        error = data !== flattenState[to];
    }
  
    return error;
  };