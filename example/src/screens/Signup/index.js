/* global CONFIG */
// import from 3rd party
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import camelCase from "camelcase";

// import from application dependency
import { Button, ErrorMessage } from "Components";
import { useTranslate, useTranslateState } from "Translate";
import { withProvider, useError, withRouter } from "Services";

import {
  DynamicForm,
  applyCrypt2State,
  useDynamicForm,
  DynamicFormProvider
} from "dynamic-form";

import { form as formConfig } from "./config.js";

const { application } = CONFIG;
const { debug } = application;

function Signup(props) {

  const { language } = useTranslateState();
  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");

  // Custom Hooks
  const i18n = useTranslate();
  const { t } = i18n;

  const [error ] = useState("");
  const { getError } = useError();

  const onSubmit = event => {
    const { _globalErrors } = errorFromService;

    if (_globalErrors > 0) {
      childRef.current.validateAll();
    } else {

      let userObject = { ...stateFromService, locale: language };

      applyCrypt2State(
        userObject,
        formConfig({
          t,
          dynamics: {
            locale: language
          }
        })
      );

      delete userObject._showError;

      console.log(userObject);
    }

    event.preventDefault();
  };

  const childRef = useRef();

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
              locale: language
            }
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

export default withProvider(DynamicFormProvider)(withRouter()(Signup));
