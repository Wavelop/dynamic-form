// import from 3rd party
import React, { useMemo } from "react";
import PropTypes from "prop-types";

// import from application dependency
import { useTheme } from "../../services";
import { useStyles } from "./style";

import { handleChangeEvent, htmlToRender } from "./utils/utils";

function FactoryComponent(props) {
  const { config, data, onChange, debug, error } = props;

  const theme = useTheme();
  const classes = useStyles(theme)();
  const { hide: hideStyle, wrapper: wrapperStyle } = classes || {};

  const renderWrapper = () => {
    console.log(data);
    return (
      <span className={config.tag === "hidden" ? hideStyle : wrapperStyle}>
        {htmlToRender(handleChangeEvent, classes)(
          config,
          data,
          onChange,
          error,
          debug
        )}
      </span>
    );
  };

  return useMemo(renderWrapper, [data, error]);
}

FactoryComponent.propTypes = {
  config: PropTypes.object,
  data: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.any,
  debug: PropTypes.bool
};

export default FactoryComponent;
