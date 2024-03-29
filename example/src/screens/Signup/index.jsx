// import from 3rd party
import React, { useState } from "react";
import PropTypes from "prop-types";
import camelCase from "camelcase";

// import from application dependency
import { Button, ErrorMessage } from "Components";
import { useTranslate, useTranslateState } from "Translate";
import { useError, withRouter } from "Services";

import {
  DynamicForm,
  useDynamicForm,
  withDynamicForm,
} from "@wavelop/dynamic-form";

import { form as formConfig } from "./config.js";

function Signup() {

  const { language } = useTranslateState()

  const dynamicForm = useDynamicForm();

  // Custom Hooks
  const i18n = useTranslate();
  const { t } = i18n;

  const [error ] = useState("");
  const { getError } = useError();

  const onSubmit = event => {

    event.preventDefault();

    try {
      const { state, stateCrypted, stateFull } = dynamicForm.submit();

      console.log(state, stateCrypted, stateFull);

    } catch ({numberOfErrors, errors}) {
      console.log(numberOfErrors, errors);
    }
  };

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
          updateErrorAtBlur={true}
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

export default withDynamicForm({ encryption: (value) => {
  return window.btoa(value);
}})(withRouter()(Signup));
