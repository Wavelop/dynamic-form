// import from 3rd party
import React, { useMemo } from "react";
import PropTypes from "prop-types";

// import from application dependency
import { handleChangeEvent, htmlToRender } from "./utils/utils";

function FactoryComponent(props) {
  const { config, data, onChange, debug, error, updateErrorAtBlur } = props;

  const renderWrapper = () => {
    return htmlToRender(handleChangeEvent)(
      config,
      data,
      onChange,
      error,
      debug,
      updateErrorAtBlur
    );
  };

  return useMemo(renderWrapper, [data, error, config]);
}

FactoryComponent.propTypes = {
  config: PropTypes.object,
  data: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.any,
  debug: PropTypes.bool,
  updateErrorAtBlur: PropTypes.any
};

export default FactoryComponent;
