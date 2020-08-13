// NPM dependencies
import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

// Application dependencies
import { useTranslate } from "Translate";
import { useApplicationState } from "Services";

function HelmetTag() {

  const i18n = useTranslate();
  const { t, getCurrentLanguage } = i18n;
  const { title } = useApplicationState()

  return (
    <ReactHelmet>
      <html lang={getCurrentLanguage()} />
      <meta charSet="utf-8" />
      <title>
        {title !== null
          ? `${title} | ${t("Application.name")}`
          : `${t("Application.name")}`}
      </title>
    </ReactHelmet>
  );
}

export default (HelmetTag);
