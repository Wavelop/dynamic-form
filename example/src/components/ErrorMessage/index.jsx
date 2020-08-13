// NPM dependencies
import React from "react";
import PropTypes from "prop-types";

// Application dependencies

function ErrorMessageComponent(props) {

  const {children, className: classNameExternal} = props; 

  return (
    <span className={classNameExternal}>
      {children}
    </span>
  );
}

ErrorMessageComponent.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node
};

export default (ErrorMessageComponent);
 