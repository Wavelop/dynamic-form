// NPM dependencies
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Application dependencies
import { useScroll } from "Services";

function FormLayout(props) {
  const { children } = props;
  const containerRef = useRef(null);
  const { setContainer } = useScroll();

  // Register container to scroll service
  useEffect(() => {
    setContainer(containerRef.current);
  });

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '50% 50%',
      alignItems: 'center',
      padding: '0px 0px 50px',
    }}>
        {children}
    </div>
  );
}

FormLayout.propTypes = {
  classes: PropTypes.object
};

export default (FormLayout);
