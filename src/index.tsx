import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { StoreProvider } from "./store/Context";
import * as serviceWorker from "./service-worker";
import { initialState, reducer } from "./store/Store";
import messages from "./text/nb";
import withMenu from "./clients/apiMock/decorator/decorator-header-withmenu";
import megamenu from "./clients/apiMock/decorator/decorator-megamenu";
import footer from "./clients/apiMock/decorator/decorator-footer";
import scripts from "./clients/apiMock/decorator/decorator-scripts";
import skiplinks from "./clients/apiMock/decorator/decorator-skiplinks";
import styles from "./clients/apiMock/decorator/decorator-styles";
import { ValidatorsProvider } from "calidation";
import { extraValidators, SimpleValidators } from "./utils/validators";
import App from "./App";

const browserLanguage = "nb";

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
    <IntlProvider locale={browserLanguage} messages={messages}>
      <ValidatorsProvider validators={extraValidators as SimpleValidators}>
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
