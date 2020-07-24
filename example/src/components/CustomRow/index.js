// NPM dependencies
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Application dependencies
import { useScroll } from "Services";

function CustomRow(props) {
  const { children } = props;
  const containerRef = useRef(null);
  const { setContainer } = useScroll();

  // Register container to scroll service
  useEffect(() => {
    setContainer(containerRef.current);
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: "row",
      alignItems: 'center',
      paddingRight: '20px',
    }}>
        {children}
    </div>
  );
}

CustomRow.propTypes = {
  classes: PropTypes.object
};

export default (CustomRow);
