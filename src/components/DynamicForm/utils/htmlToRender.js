import React from "react";
import { FactoryComponent, DebugFactoryComponent } from "../../";

const noModelTags = ["label"];

let model = {};
let error = {};

export const htmlToRender = ({
  stateFromService,
  errorFromService,
  dispatchModel,
  handleChange
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
          <span key={index * index + 1}>
            <FactoryComponent
              debug={debug}
              onChange={handleChange(dispatchModel, "UPDATE_MODEL")}
              config={configObj}
              data={
                stateFromService && stateFromService[configObj.name]
                  ? tag === "hidden"
                    ? model[name]
                    : stateFromService[configObj.name]
                  : configObj.defaultValue !== undefined &&
                    configObj.defaultValue !== null
                  ? configObj.defaultValue
                  : ""
              }
              error={
                errorFromService && errorFromService[configObj.name]
                  ? tag === "hidden"
                    ? error[name]
                    : errorFromService[configObj.name]
                  : false
              }
            />
            {debug && (
              <DebugFactoryComponent
                model={model[configObj.name]}
                state={
                  stateFromService && stateFromService[configObj.name]
                    ? tag === "hidden"
                      ? model[name]
                      : stateFromService[configObj.name]
                    : configObj.defaultValue !== undefined &&
                      configObj.defaultValue !== null
                    ? configObj.defaultValue
                    : ""
                }
                error={errorFromService[configObj.name]}
              />
            )}
          </span>
        );
      })
    ) : (
      <span />
    );

    return value;
  };
};
