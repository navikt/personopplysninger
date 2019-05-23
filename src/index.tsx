import "react-app-polyfill/ie9";
import "core-js/fn/array/includes";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import nb from "react-intl/locale-data/nb";
import { setUpMock } from "./clients/apiMock";
import App from "./App";
import "css/index.css";
import nbMessages from "./text/nb";
import { StateProvider } from "./providers/Provider";
import { initialState, reducer } from "./providers/Store";

// Intl polyfill
global.Intl = require("intl");

const browserLanguage = "nb";
const messages = {
  nb: nbMessages
};

addLocaleData([...nb]);

if (process.env.NODE_ENV === "development") {
  setUpMock();
}

ReactDOM.render(
  <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </IntlProvider>,
  document.getElementById("app")
);
