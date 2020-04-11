

export const FactoryComponentReferenceFactory = () => {

  const generatedError = {}

  const setGeneratedError = (name, value) => {
    generatedError[name] = value;
  };

  const getGeneratedError = () => {
      return generatedError;
  };

  return {
      setGeneratedError,
      getGeneratedError
  };
}
