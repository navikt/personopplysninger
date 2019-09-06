import "react-app-polyfill/ie9";
import "core-js/fn/array/includes";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import { StoreProvider } from "./providers/Provider";
import * as serviceWorker from "./service-worker";
import { initialState, reducer } from "./providers/Store";
import nb from "react-intl/locale-data/nb";
import nbMessages from "./text/nb";

import withMenu from "./clients/apiMock/decorator/decorator-header-withmenu";
import megamenu from "./clients/apiMock/decorator/decorator-megamenu";
import footer from "./clients/apiMock/decorator/decorator-footer";
import scripts from "./clients/apiMock/decorator/decorator-scripts";
import skiplinks from "./clients/apiMock/decorator/decorator-skiplinks";
import styles from "./clients/apiMock/decorator/decorator-styles";

import App from "./App";
import { ValidatorsProvider } from "calidation";
import { extraValidators } from "./utils/validators";

// Intl polyfill
global.Intl = require("intl");

const browserLanguage = "nb";
const messages = {
  nb: nbMessages
};

addLocaleData([...nb]);

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("./clients/apiMock").then(({ setUpMock }) => setUpMock());
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_HEADING}}}",
      withMenu
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_FOOTER}}}",
      footer
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_STYLES}}}",
      styles
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_SCRIPTS}}}",
      scripts
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_SKIPLINKS}}}",
      skiplinks
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{MEGAMENU_RESOURCES}}}",
      megamenu
    );
  }

  ReactDOM.render(
    <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
      <ValidatorsProvider validators={extraValidators}>
        <StoreProvider initialState={initialState} reducer={reducer}>
          <App />
        </StoreProvider>
      </ValidatorsProvider>
    </IntlProvider>,
    document.getElementById("app")
  );
  serviceWorker.unregister();
};
init();
