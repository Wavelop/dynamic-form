import React, { useState, useEffect, forwardRef, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

// Application dependencies
import { useDynamicForm, saveConfig, saveUpdateError } from "../../services";
import { uuid4 } from "../../utils";

import {
  handleChange,
  htmlToRender,
  updateError,
  updateErrorOnSubmit,
  setupModel,
  dataCoverterHandler
} from "./utils/utils";

const DynamicForm = forwardRef((props, ref) => {
  const { config, updateErrorAtBlur, debug, layout, internal } = props;
  
  const [id] = useState(uuid4());
  
  const stateFromService = useDynamicForm("state", "model");
  const errorFromService = useDynamicForm("state", "error");
  const dispatchModel = useDynamicForm("dispatch", "model");
  const dispatchError = useDynamicForm("dispatch", "error");
  const helpers = useDynamicForm();
  const { idStateModel, idStateError } = helpers;
  
  useMemo(() => {
    !internal && saveConfig(idStateModel, id, config, internal);
  }, [config, internal]);

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

    saveUpdateError(idStateError, errorFromDynamicFormValidationOnSubmit => {
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
    let result = children;
    if (Layout) {
      result = <Layout>{children}</Layout>;
    }
    return result;
  };

  const renderWrapperMemo = useCallback(renderWrapper, [
    config,
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
  updateErrorAtBlur: PropTypes.any,
  internal: PropTypes.bool,
};

export default DynamicForm;
