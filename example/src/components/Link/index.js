// NPM dependencies
import React from "react";
import PropTypes from "prop-types";

// Application dependencies
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

function LinkComponent(props) {
  const {
    href,
    color,
    component,
    TypographyClasses,
    underline,
    variant,
    children,
    onClick,
    className,
    to,
    target
  } = props;

  return !!href ? (
    <Link
      href={href}
      color={color}
      component={component}
      TypographyClasses={TypographyClasses}
      underline={underline || "always"}
      variant={variant}
      onClick={onClick}
      className={className}
      target={target}
    >
      {children}
    </Link>
  ) : !!to ? (
    <Link
      color={color}
      component={RouterLink}
      TypographyClasses={TypographyClasses}
      underline={underline || "always"}
      variant={variant}
      onClick={onClick}
      className={className}
      to={to}
    >
      {children}
    </Link>
  ) : (
    <span></span>
  );
}

LinkComponent.propTypes = {
  classes: PropTypes.object,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "default",
    "error",
    "inherit",
    "primary",
    "secondary",
    "textPrimary",
    "textSecondary"
  ]),
  component: PropTypes.node,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  TypographyClasses: PropTypes.object,
  underline: PropTypes.oneOf(["none", "hover", "always"]),
  variant: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  target: PropTypes.string
};

export default (LinkComponent);
