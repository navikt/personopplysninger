import "react-app-polyfill/ie9";
import "core-js/fn/array/includes";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import nb from "react-intl/locale-data/nb";
import en from "react-intl/locale-data/en";
import { setUpMock } from "./clients/apiMock";
import App from "./App";
import "css/index.css";

import nbMessages from "./translations/nb.json";
import enMessages from "./translations/en.json";

interface Messages {
  [key: string]: { [key: string]: string };
}

const messages: Messages = {
  nb: nbMessages,
  en: enMessages
};

const browserLanguage = navigator.language.split(/[-_]/)[0];
addLocaleData([...nb, ...en]);

if (process.env.NODE_ENV === "development") {
  setUpMock();
}

ReactDOM.render(
  <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
    <App />
  </IntlProvider>,
  document.getElementById("app")
);
