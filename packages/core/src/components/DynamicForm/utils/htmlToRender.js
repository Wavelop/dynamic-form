import React from "react";
import { FactoryComponent } from "../../";

const noModelTags = ["label"];

let model = {};
let error = {};

export const htmlToRender = ({
  stateFromService,
  errorFromService,
  dispatchModel,
  handleChange,
  updateErrorAtBlur
}) => {
  return (config, { debug }) => {
    const value = config ? (
      config.map((configObj, index) => {
        const { name, tag } = configObj;
        if (noModelTags.indexOf(tag) === -1) {
          model[name] =
            configObj.defaultValue !== undefined &&
            configObj.defaultValue !== null
              ? configObj.defaultValue
              : null;
          error[name] = [];
        }
        if (tag === "hidden") {
          model[name] = configObj.value;
        }

        return (
            <FactoryComponent
              key={index * index + 1}
              updateErrorAtBlur={updateErrorAtBlur}
              debug={debug}
              onChange={handleChange(dispatchModel, "UPDATE_MODEL")}
              config={configObj}
              data={
                stateFromService !== undefined && stateFromService[configObj.name] !== null
                  ? stateFromService[configObj.name]
                  : configObj.defaultValue !== undefined &&
                    configObj.defaultValue !== null
                  ? configObj.defaultValue
                  : undefined
              }
              error={
                errorFromService && errorFromService[configObj.name]
                  ? tag === "hidden"
                    ? error[name]
                    : errorFromService[configObj.name]
                  : false
              }
            />
        );
      })
    ) : (
      <span />
    );

    return value;
  };
};
