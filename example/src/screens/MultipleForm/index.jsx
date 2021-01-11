// import from 3rd party
import React from "react";
import PropTypes from "prop-types";

// import from application dependency
import { Button, FormLayout } from "Components";
import { useTranslate, useTranslateState } from "Translate";
import { withRouter } from "Services";
import {
  DynamicForm,
  useDynamicForm,
  withDynamicForm,
} from "@wavelop/dynamic-form";

import { form as formConfig } from "./config.js";

function MultipleForm1(props) {

  const { language } = useTranslateState()

  const dynamicForm = useDynamicForm();

  // Custom Hooks
  const i18n = useTranslate();
  const { t } = i18n;

  const onSubmit = (kind) => event => {

    event.preventDefault();

    try {
      const { state, stateCrypted, stateFull, stateGroupedByRows } = dynamicForm.submit();

      console.log(kind, state, stateCrypted, stateFull, stateGroupedByRows);

      props.update({state});

    } catch ({errors}) {
      props.update({errors});
    }
  };

  return (
    <section style={{
      maxWidth: "1024px",
      margin: "0 auto"
    }}>

      <form onSubmit={onSubmit(0)}>
        <DynamicForm
          config={formConfig({
            t,
            dynamics: {
              locale: language
            }
          })}
          updateErrorAtBlur={true}
          layout={FormLayout}
        />

        <Button
          type="submit"
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

MultipleForm1.propTypes = {
  classes: PropTypes.object
};

const Form1 = withDynamicForm({ encryption: (value) => {
  return window.btoa(value);
}})(MultipleForm1);

function MultipleForm2(props) {

  const { language } = useTranslateState()

  const dynamicForm = useDynamicForm();

  // Custom Hooks
  const i18n = useTranslate();
  const { t } = i18n;

  const onSubmit = (kind) => event => {

    event.preventDefault();

    try {
      const { state, stateCrypted, stateFull, stateGroupedByRows } = dynamicForm.submit();

      console.log(kind, state, stateCrypted, stateFull, stateGroupedByRows);

      props.update({state});

    } catch ({errors}) {
      props.update({errors});
    }
  };

  return (
    <section style={{
      maxWidth: "1024px",
      margin: "0 auto"
    }}>

      <form onSubmit={onSubmit(1)}>
        <DynamicForm
          config={formConfig({
            t,
            dynamics: {
              locale: language
            }
          })}
          updateErrorAtBlur={true}
          layout={FormLayout}
        />

        <Button
          type="submit"
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

MultipleForm2.propTypes = {
  classes: PropTypes.object
};

const Form2 = withDynamicForm({ encryption: (value) => {
  return window.btoa(value);
}})(MultipleForm2);

function Signup() {

  return (
    <section style={{
      maxWidth: "1024px",
      margin: "0 auto"
    }}>
    
      <Form1 update={(result) => {
        console.log(result);
      }} />

      <Form2 update={(result) => {
        console.log(result);
      }} />
        
    </section>
  );
}

Signup.propTypes = {
  classes: PropTypes.object
};

export default withRouter()(Signup);