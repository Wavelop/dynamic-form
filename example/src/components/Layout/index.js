// NPM dependencies
import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Application dependencies
import { useScroll } from "Services";

function Layout(props) {
  const { children } = props;
  const containerRef = useRef(null);
  const { setContainer } = useScroll();

  // Register container to scroll service
  useEffect(() => {
    setContainer(containerRef.current);
  });

  return (
    <div style={{padding: "4rem"}}>
      <main ref={containerRef}>
        <span >{children}</span>
      </main>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object
};

export default (Layout);
