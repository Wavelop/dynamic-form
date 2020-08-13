import React from "react";
import { addDecorator } from "@storybook/react";
import { addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { DynamicFormProvider } from "../packages/core/src/services/index.js";

const headers = ["Getting Started", "Components"];

// UTIL FUNCTIONS

const storySort = (a, b) => {
  const aHeader = a[1].kind.substr(0, a[1].kind.indexOf("|"));
  const bHeader = b[1].kind.substr(0, b[1].kind.indexOf("|"));

  if (aHeader !== bHeader) {
    // Comparing something like "components-accordion--main" to "getting-started-app--main".
    const aHeaderIndex = headers.findIndex(h => h === aHeader);
    const bHeaderIndex = headers.findIndex(h => h === bHeader);
    return aHeaderIndex - bHeaderIndex;
  }

  return 0;
};

// DECORATORS

addDecorator(storyFn => (
  <DynamicFormProvider> {storyFn()} </DynamicFormProvider>
));

// PARAMETERS

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
});

addParameters({
  options: {
    storySort
  }
});
