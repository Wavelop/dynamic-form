// NPM dependencies
import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

function Spinner (props) {

    return (
      <div>
        <CircularProgress />
      </div>
    );
  
}

Spinner.propTypes = {
  classes: PropTypes.object,
  fullScreen: PropTypes.bool
};

export default (Spinner);
