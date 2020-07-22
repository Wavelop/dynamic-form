// NPM dependencies
// import React, {useState} from "react";
import React, { useMemo } from "react";
import PropTypes from "prop-types";

// Debug
let renderCount = {}; 

function CustomInputComponent(props) {
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

    debug,
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
  }

  const printCounter = () => {
    renderCount[name] = renderCount[name] !== undefined ? renderCount[name]+1 : 1;
    console.table({
      "From file": "src/dynamicForm/components/Input/index.js",
      "Input name": name,
      "Input type": type || "text",
      "Render count": renderCount[name]
    });
  }

  const renderInput = () => {

    debug && printCounter();

    return (
      <section style={{    
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}>
        {inputLabel && (
          <label style={{    
            fontFamily: "Helvetica",
            color: "gray"
          }}  htmlFor={htmlFor}>
            {inputLabel}
          </label>
        )}
        <input 
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            lineHeight: "30px",
            minWidth: "200px",
            margin: "10px 0px 0px",
          }}
          {...attributes}
        /> 
        {}
        {error && showErrorOnInput && (
          <p style={{
            padding: "0",
            margin: "10px 0 0 0",
            fontSize: "14px",
            fontFamily: "Helvatica",
            fontWeight: "100",
            color: "red",
          }}>
            {errorMessage}
          </p>
        )}
      </section>
    );
  };

  return useMemo(renderInput, [value, error, errorMessage]);
}

CustomInputComponent.propTypes = {
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
  
  debug: PropTypes.bool,
};

export default CustomInputComponent;
