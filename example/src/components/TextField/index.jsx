// NPM dependencies
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TextField from '@material-ui/core/TextField';

function TextFieldComponent(props) {
    const {
        id,
        name,
        type,
        attributes,

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


    const renderInput = () => 
        (
            <section id={id}>
                <TextField
                    id={name}
                    label={`${inputLabel}${required && "*"}`}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    helperText={!!!value ? (placeholder || '') : ''}
                    readOnly={disabled}
                    error={false}
                    {...attributes}
                >
                    
                </TextField>

                {error && showErrorOnInput && (
                    <p style={{
                            padding: "0",
                            margin: "10px 0 0 0",
                            fontSize: "14px",
                            fontFamily: "Helvatica",
                            fontWeight: "100",
                            color: "red",
                        }}
                    >
                        {errorMessage}
                    </p>
                )}
            </section>
        );


  return useMemo(renderInput, [value, error, errorMessage]);
}

TextFieldComponent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  attributes: PropTypes.any,

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

export default TextFieldComponent;
