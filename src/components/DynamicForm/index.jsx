import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback
} from "react";
import PropTypes from "prop-types";

// Application dependencies
import { useDynamicForm, useTheme } from "../../services"; 
import { useStyles } from "./style";
import { handleChange } from "./utils/handleChange";
import { htmlToRender } from "./utils/htmlToRender";
import { updateError } from "./utils/updateError";
import { setupModel } from "./utils/setupModel";
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

  useImperativeHandle(ref, () => ({
    validateAll() {
      return errorFromService;
    }
  }));

  const updateGlobalErrors = () => {
    updateError(config, updateModelAtBlur, dispatchError)(stateFromService);
  };

  const memoizeDispatchFunc = useCallback(updateGlobalErrors, [
    stateFromService
  ]);

  useEffect(() => {
    memoizeDispatchFunc();
  }, [memoizeDispatchFunc]);

  const init = () => {
    setupModel(config, dispatchModel);
  };

  const initFunc = useCallback(init, []);

  useEffect(() => {
    initFunc();
  }, [initFunc]);

  return (
    <section className={wrapperStyle}>
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
