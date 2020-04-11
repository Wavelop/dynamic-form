export const handleChangeEvent = (
  name,
  handleChange,
  eventType
) => (e) => {  
  handleChange(name, eventType)(e);
};
