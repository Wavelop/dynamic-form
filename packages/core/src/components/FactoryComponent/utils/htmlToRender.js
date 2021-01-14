import React from "react";
import { printCounter } from "./printCounter";
import { dataCoverterHandler } from "./dataCoverterHandler";
import { DynamicForm } from "../../";

export const htmlToRender = handleChangeEvent => (
  config,
  data,
  handleChange,
  error,
  debug,
  updateErrorAtBlur
) => {
  config &&
    config.tag &&
    (typeof config.tag === "function" || config.tag === "row") &&
    debug &&
    printCounter(config);

  let newValue = <span />;

  const requiredField =
    config &&
    config.validations &&
    !!config.validations.find(validation => {
      return validation.kind === "required";
    });

  switch (config.tag) {
    // Default components
    case "row":
      newValue = (
        <DynamicForm
          config={config.fields}
          layout={config.customRow}
          updateErrorAtBlur={updateErrorAtBlur}
          internal={true}
        />
      );
      break;

    // Custom components
    default:
      if (config && config.tag && typeof config.tag === "function") {
        newValue = (
          <config.tag
            id={config.name}
            name={config.name}
            htmlFor={config.name}
            type={config.type}
            attributes={config.attributes}
            inputLabel={config.label}
            showErrorOnInput={true}
            error={error}
            errorMessage={error[0] && error[0].message}
            required={requiredField}
            options={config.options}
            onBlur={handleChangeEvent(config.name, handleChange, "onBlur")}
            onChange={handleChangeEvent(config.name, handleChange, "onChange")}
            value={dataCoverterHandler(data, config)}
            placeholder={config.helperText}
            disabled={
              config.disabled === true
                ? true
                : config.disabled === false
                ? false
                : typeof config.disabled === "function"
                ? config.disabled({ options: config.options })
                : false
            }
            readOnly={!!config.readOnly}
            debug={debug}
          />
        );
      }
      break;
  }

  return newValue;
};
