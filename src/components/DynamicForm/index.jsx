import React, {
  useEffect,
  forwardRef,
  isValidElement,
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
  setupModel,
  dataCoverterHandler
} from "./utils/utils";

import { DebugDynamicForm } from "../";

const DynamicForm = forwardRef((props, ref) => {
  const { config, updateErrorAtBlur, debug, layout } = props;

  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");
  const dispatchModel = useDynamicForm("dispatch", "model");
  const dispatchError = useDynamicForm("dispatch", "error");
  const theme = useTheme();
  const classes = useStyles(theme)();
  const { wrapper: wrapperStyle } = classes || {};

  const updateGlobalErrors = () => {
    updateError(
      config,
      updateErrorAtBlur,
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
    setupModel(config, dispatchModel, dataCoverterHandler);
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

  const renderWrapper = (Layout, children) => {
    let result = <section className={wrapperStyle}>{children}</section>;
    if (Layout) {
      result = <Layout>{children}</Layout>;
    }
    return result;
  };

  const renderWrapperMemo = useCallback(renderWrapper, [
    stateFromService,
    errorFromService
  ]);

  return renderWrapperMemo(
    layout,
    htmlToRender({
      stateFromService,
      errorFromService,
      dispatchModel,
      handleChange,
      updateErrorAtBlur
    })(config, { debug })
  );
});

DynamicForm.propTypes = {
  config: PropTypes.array,
  validateOnFocusOut: PropTypes.bool,
  debug: PropTypes.bool,
  layout: PropTypes.any,
  updateErrorAtBlur: PropTypes.any
};

export default DynamicForm;
