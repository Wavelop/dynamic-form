// NPM dependencies
import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

function ButtonComponent(props) {
  const {
    children,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    endIcon,
    fullWidth,
    href,
    size,
    startIcon,
    variant,
    type,
    onClick
  } = props;

  return (
    <Button
      component={component}
      disabled={disabled}
      disableElevation={disableElevation}
      disableFocusRipple={disableFocusRipple}
      disableRipple={disableRipple}
      endIcon={endIcon}
      fullWidth={fullWidth}
      href={href}
      size={size}
      startIcon={startIcon}
      variant={variant}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

ButtonComponent.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType,
  disabled: PropTypes.bool,
  disableElevation: PropTypes.bool,
  disableFocusRipple: PropTypes.bool,
  disableRipple: PropTypes.bool,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  href: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  startIcon: PropTypes.node,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default ButtonComponent;
