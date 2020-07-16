/* global CONFIG */
// import from 3rd party
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import camelCase from "camelcase";

// import from application dependency
import { Button, ErrorMessage } from "Components";
import { useTranslate, useTranslateState } from "Translate";
import { useError, withRouter } from "Services";

import {
  DynamicForm,
  applyCrypt2State,
  useDynamicForm,
  withDynamicForm,
} from "dynamic-form";

import { form as formConfig } from "./config.js";

const { application } = CONFIG;
const { debug } = application;

function Signup(props) {

  const { language } = useTranslateState()

  const dynamicForm = useDynamicForm();
  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");

  // Custom Hooks
  const i18n = useTranslate();
  const { t } = i18n;

  const [error ] = useState("");
  const { getError } = useError();

  const onSubmit = async event => {

    event.persist();  

    console.log(dynamicForm.submit());
     

    // idea, quando faccio submit devo chiamare una funzione del form che mi ritorna si, puoi fare submit oppure no

    // al posto di una varibile, avere una funzione che ritorna il numero di errori globali nel form
    const { _globalErrors } = errorFromService;

    if (_globalErrors > 0) {
      childRef.current.validateAll(); // deve fare parte della funzione submit del form
    } else {

      let userObject = { ...stateFromService, locale: language }; // possibilità di gestire oggetti fuori modello del form

      // al submit devo applicare anche il criptaggio
      applyCrypt2State(
        userObject,
        formConfig({
          t,
          dynamics: {
            locale: language
          }
        })
      );

      delete userObject._showError; // non devo tornare valori di appggio all'utente

      console.log(userObject);
    }

    event.preventDefault();
  };

  // Desiderato: 

  // const onSubmit = async event => {

  //   event.persist();  
  //   event.preventDefault();

  //   try {
  //     const { state, stateCrypted, stateFull } = await dynamicForm.submit();

  //     console.log(state, stateCrypted, stateFull);

  //   } catch ({globalErrors, errors}) {
  //     console.log(globalErrors, errors);
  //   }
  // };

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

export default withDynamicForm({ encryption: (value) => {
  return window.btoa(value);
}})(withRouter()(Signup));
