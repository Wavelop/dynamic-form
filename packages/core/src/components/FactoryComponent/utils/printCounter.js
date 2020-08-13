// Debug
let renderCountFactory = {};

export const printCounter = config => {
  renderCountFactory[config.name] =
    renderCountFactory[config.name] !== undefined
      ? renderCountFactory[config.name] + 1
      : 1;
  console.table({
    "From file": "src/dynamicForm/components/FactoryComponent/index.js",
    "Input name": config.name,
    "Input type": config.type || "text",
    "Render count": renderCountFactory[config.name]
  });
};
