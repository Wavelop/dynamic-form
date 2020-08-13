// NPM dependencies
// import React, {useState} from "react";
import React, { useMemo } from "react";
import PropTypes from "prop-types";

// Debug
let renderCount = {};

function InputComponent(props) {
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
    value: value || "",
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
      "From file": "src/dynamicForm/components/Input/index.js",
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
        <input {...attributes} />
        {}
        {error && showErrorOnInput && (
          <p>{errorMessage}</p>
        )}
      </section>
    );
  };

  return useMemo(renderInput, [value, error, errorMessage]);
}

InputComponent.propTypes = {
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

export default InputComponent;
