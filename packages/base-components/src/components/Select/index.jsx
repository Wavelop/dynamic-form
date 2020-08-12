// NPM dependencies
import React, { useMemo } from "react";
import PropTypes from "prop-types";

// Debug
let renderCount = {};

function SelectComponent(props) {
  const {
    id,
    name,
    htmlFor,
    type,

    inputLabel,

    showErrorOnInput,
    error,
    errorMessage,

    value,
    placeholder,
    options,

    required,
    disabled,

    onBlur,
    onChange,

    debug
  } = props;

  const attributes = {
    id,
    name,
    type,
    value,
    placeholder,
    required,
    disabled,
    onBlur,
    onChange
  };

  const printCounter = () => {
    renderCount[name] =
      renderCount[name] !== undefined ? renderCount[name] + 1 : 1;
    console.table({
      "From file": "src/components/Select/index.jsx",
      "Input name": name,
      "Input type": type || "text",
      "Render count": renderCount[name]
    });
  };

  const renderInput = () => {
    debug && printCounter();

    return (
      <section>
        {inputLabel && (
          <label htmlFor={htmlFor}>
            {inputLabel}
          </label>
        )}
        <select {...attributes}>
          {options.map((configObj, index) => {
            const { name, value } = configObj || {};
            return (
              <option key={index} value={value}>
                {name}
              </option>
            );
          })}
        </select>

        {error && showErrorOnInput && (
          <p>{errorMessage}</p>
        )}
      </section>
    );
  };

  return useMemo(renderInput, [value, error, errorMessage]);
}

SelectComponent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  htmlFor: PropTypes.string,
  type: PropTypes.string,

  inputLabel: PropTypes.string,

  showErrorOnInput: PropTypes.bool,
  error: PropTypes.any,
  errorMessage: PropTypes.string,

  value: PropTypes.any,
  placeholder: PropTypes.string,

  required: PropTypes.bool,
  disabled: PropTypes.bool,

  onBlur: PropTypes.func,
  onChange: PropTypes.func,

  debug: PropTypes.bool
};

export default SelectComponent;
