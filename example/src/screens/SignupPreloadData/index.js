/* global CONFIG */
// import from 3rd party
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import camelCase from "camelcase";

// import from application dependency
import { Button, ErrorMessage } from "Components";
import { useTranslate, useTranslateState } from "Translate";
import { useError, withRouter, encryption } from "Services";

import {
  DynamicForm,
  applyCrypt2State,
  useDynamicForm,
  withDynamicForm
} from "dynamic-form";

import { form as formConfig } from "./config.js";

const { application } = CONFIG;
const { debug } = application;

function Signup() {

  const { language } = useTranslateState();
  const dynamicForm = useDynamicForm();
  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");
  const dispatchModel = useDynamicForm("dispatch", "model");
  const dispatchError = useDynamicForm("dispatch", "error");

  // Custom Hooks
  const i18n = useTranslate();
  const { t } = i18n;

  const [error, setError] = useState("");
  const { getError } = useError();

  const onSubmit = (event) => {
    
    console.log(dynamicForm.submit());

    const { _globalErrors } = errorFromService;

    if (_globalErrors > 0) {
      childRef.current.validateAll();
      setError("form-invalid");
      dispatchError({
        type: "SHOW_ERROR",
      });
    } else {
      // TODO: locale: language is a workaround
      let userObject = { ...stateFromService, locale: language };

      applyCrypt2State(
        userObject,
        formConfig({
          t,
          dynamics: {
            locale: language,
          },
        })
      );

      delete userObject._showError; // utils variable

      console.log(userObject);
    }

    event.preventDefault();
  };

  const childRef = useRef();

  // ---------------------------
  // Way to prepopolate the form
  useEffect(() => {    
    dispatchModel({
      type: "UPDATE_MODEL",
      newState: {
        email: "matteo.granzotto@gmail.com",
        password: "test",
        confirmPassword: "test",
      },
    });
  }, [dispatchModel]);
  // ---------------------------

  // Render
  return (
    <section>
      {error && getError(error) ? (
        <ErrorMessage> {t(`Error.message.${camelCase(error)}`)} </ErrorMessage>
      ) : (
        ""
      )}

      <form onSubmit={onSubmit}>
        <DynamicForm
          config={formConfig({
            t,
            dynamics: {
              locale: language,
            },
          })}
          ref={childRef}
          updateModelAtBlur={true}
          debug={debug}
        />

        <Button
          type="submit"
          onClick={onSubmit}
          fullWidth
          variant="contained"
          color="primary"
        >
          {t("Signup.confirm")}
        </Button>
      </form>
    </section>
  );
}

Signup.propTypes = {
  classes: PropTypes.object
};

export default withDynamicForm ({ encryption, customTheme: {colorPrimary: "red"} }) ( withRouter()((Signup)) );