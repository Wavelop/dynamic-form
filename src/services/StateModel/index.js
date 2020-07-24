export const groupByRows = config => state => {
  const copyOfModelState = { ...state };
  const stateGroupedByRows = {};

  config.forEach(configElement => {
    const { tag, name, fields } = configElement;
    if (tag === "row") {
      stateGroupedByRows[name] = groupByRows(fields)(state);
    } else {
      stateGroupedByRows[name] = state[name];
    }
  });

  return stateGroupedByRows;
};
