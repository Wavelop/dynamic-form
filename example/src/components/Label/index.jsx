// NPM dependencies
import React from "react";
import JsxParser from 'react-jsx-parser'; 

// Application dependencies
import { Link } from "Components";

function LabelComponent(props) {
  const { id, name, label } = props;

  return (
    <span>
      <span id={id} name={name}>
        <JsxParser components={{ Link }} jsx={label} />
      </span>
    </span>
  );
}

export default (LabelComponent);
