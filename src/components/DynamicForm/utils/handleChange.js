export const handleChange = (dispatch, type) => (
  name,
  actionOfTheEvent
) => event => {
  const { type: eventType, value, checked } = event.target;
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

  console.log("MODEL", {
    type,
    newState,
    metadata: { lastEvent: actionOfTheEvent }
  });

  dispatch({ type, newState, metadata: { lastEvent: actionOfTheEvent } });
};
