import React from "react";
import { Input } from "../../"; // TODO: make free from materila ui
import { printCounter } from "./printCounter";
import { dataCoverterHandler } from "./dataCoverterHandler";

export const htmlToRender = (handleChangeEvent, classes) => (
  config,
  data,
  handleChange,
  error,
  debug
) => {
  debug && printCounter(config);

  let newValue = <span className={classes.hide} />;

  const requiredField =
    config &&
    config.validations &&
    !!config.validations.find(validation => {
      return validation.kind === "required";
    });

  switch (config.tag) {
    // Default components
    case "input":
      newValue = (
        <Input
          id={config.name}
          name={config.name}
          htmlFor={config.name}
          type={config.type}
          inputLabel={config.label}
          showErrorOnInput={true}
          error={error}
          errorMessage={error[0] && error[0].message}
          required={requiredField}
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
          debug={debug}
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
            inputLabel={config.label}
            showErrorOnInput={true}
            error={error}
            errorMessage={error[0] && error[0].message}
            required={requiredField}
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
            debug={debug}
          />
        );
      }
      break;
  }

  return newValue;
};
