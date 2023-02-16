import "./polyfills";
import React from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./store/Context";
import { injectDecoratorClientSide } from "@navikt/nav-dekoratoren-moduler";
import WithLanguages from "./store/providers/Language";
import App from "./App";

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("./clients/apiMock").then(({ setUpMock }) => setUpMock());
    injectDecoratorClientSide({
      env: "localhost",
      port: 8100,
      enforceLogin: false,
    });
  }

  const container = document.getElementById("app");
  if (!container) {
    return;
  }
  const root = createRoot(container);

  root.render(
    <StoreProvider>
      <WithLanguages>
        <App />
      </WithLanguages>
    </StoreProvider>
  );
};
init();
