

export const DynamicFormRefrenceFactory = () => {

  const refs = {}

  const setRef = (name, value) => {
    refs[name] = value;
  };

  const getRefs = () => {
      return refs;
  };

  return {
      setRef,
      getRefs
  };
}
