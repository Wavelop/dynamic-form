// NPM dependencies
// import React, {useState} from "react";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Debug
let renderCount = {}; 

function DatePickerComponent(props) {
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

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onFocusOut = (date) => {
    onBlur({
      target: {
        value: date
      }
    });
  };

  const renderInput = () => {

    debug && printCounter();

    return (

      <section>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              autoOk={false}
              id={name}
              helperText={''}
              error={false}
              label={inputLabel}
              value={value || selectedDate}
              onChange={handleDateChange}
              onAccept={onFocusOut}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
        </MuiPickersUtilsProvider>

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

DatePickerComponent.propTypes = {
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

export default DatePickerComponent;
