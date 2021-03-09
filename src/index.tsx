import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./store/Context";
import * as serviceWorker from "./service-worker";
import { ValidatorsProvider } from "calidation";
import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import { extraValidators } from "./utils/validators";
import WithLanguages from "./store/providers/Language";
import App from "./App";

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("./clients/apiMock").then(({ setUpMock }) => setUpMock());
    injectDecoratorClientSide({
      env: "localhost",
      port: 8100,
      enforceLogin: true,
      level: "Level4",
      redirectToApp: true,
      breadcrumbs: [
        {
          url: `https://www.nav.no/person/dittnav/`,
          title: "Ditt NAV",
        },
        {
          url: `https://www.nav.no/person/personopplysninger/`,
          title: `Personopplysninger`,
        },
      ],
    });
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
