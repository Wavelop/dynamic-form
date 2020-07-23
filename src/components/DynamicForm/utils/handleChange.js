export const handleChange = (dispatch, type) => (
  name,
  actionOfTheEvent
) => event => {
  const { target } = event || {};
  const { type: eventType, value, checked } = target || {};
  let newState = {};
  let newValue = null;

  // Setup
  switch (eventType) {
    case "checkbox":
      newValue = checked;
      break;
    default:
      newValue = value;
      break;
  }
  newState[name] = newValue;

  dispatch({ type, newState, metadata: { lastEvent: actionOfTheEvent } });
};
