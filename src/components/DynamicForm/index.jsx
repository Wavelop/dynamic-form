import React, {
  useEffect,
  forwardRef,
  useRef,
  useImperativeHandle,
  useCallback
} from "react";
import PropTypes from "prop-types";

// Application dependencies
import {
  useDynamicForm,
  useTheme,
  saveConfig,
  saveUpdateError
} from "../../services";

import { useStyles } from "./style";

import {
  handleChange,
  htmlToRender,
  updateError,
  updateErrorOnSubmit,
  setupModel
} from "./utils/utils";

import { DebugDynamicForm } from "../";

const DynamicForm = forwardRef((props, ref) => {
  const { config, updateModelAtBlur, debug } = props;

  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");
  const dispatchModel = useDynamicForm("dispatch", "model");
  const dispatchError = useDynamicForm("dispatch", "error");
  const theme = useTheme();
  const classes = useStyles(theme)();
  const { wrapper: wrapperStyle } = classes || {};
  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    validateAll() {
      return errorFromService;
    },
    upadareErrorService(errorFromDynamicFormValidationOnSubmit) {
      updateErrorOnSubmit(dispatchError)(
        errorFromDynamicFormValidationOnSubmit
      );
    }
  }));

  const updateGlobalErrors = () => {
    updateError(
      config,
      updateModelAtBlur,
      dispatchError
    )(stateFromService, errorFromService);
  };

  const memoizeDispatchFunc = useCallback(updateGlobalErrors, [
    stateFromService
  ]);

  useEffect(() => {
    memoizeDispatchFunc();
  }, [memoizeDispatchFunc]);

  const init = () => {
    setupModel(config, dispatchModel);
    saveConfig(config);

    saveUpdateError(errorFromDynamicFormValidationOnSubmit => {
      updateErrorOnSubmit(dispatchError)(
        errorFromDynamicFormValidationOnSubmit
      );
    });
  };

  const initFunc = useCallback(init, []);

  useEffect(() => {
    initFunc();
  }, [initFunc]);

  return (
    <section className={wrapperStyle} ref={childRef}>
      {htmlToRender({
        stateFromService,
        errorFromService,
        dispatchModel,
        handleChange
      })(config, { debug })}
      {debug && <DebugDynamicForm />}
    </section>
  );
});

DynamicForm.propTypes = {
  config: PropTypes.array,
  validateOnFocusOut: PropTypes.bool,
  debug: PropTypes.bool
};

export default DynamicForm;
