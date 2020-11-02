import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./store/Context";
import * as serviceWorker from "./service-worker";
import header from "./clients/apiMock/decorator/decorator-header";
import footer from "./clients/apiMock/decorator/decorator-footer";
import scripts from "./clients/apiMock/decorator/decorator-scripts";
import styles from "./clients/apiMock/decorator/decorator-styles";
import { ValidatorsProvider } from "calidation";
import { extraValidators } from "./utils/validators";
import WithLanguages from "./store/providers/Language";

import App from "./App";

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("./clients/apiMock").then(({ setUpMock }) => setUpMock());
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{STYLES}}}",
      styles
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{HEADER}}}",
      header
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{FOOTER}}}",
      footer
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{SCRIPTS}}}",
      scripts
    );

    // Execute client.js
    var script = document.createElement("script");
    script.src = "http://localhost:8100/dekoratoren/client.js";
    document.body.appendChild(script);
  }

  ReactDOM.render(
    <StoreProvider>
      <ValidatorsProvider validators={extraValidators}>
        <WithLanguages>
          <App />
        </WithLanguages>
      </ValidatorsProvider>
    </StoreProvider>,
    document.getElementById("app")
  );
  serviceWorker.unregister();
};
init();
