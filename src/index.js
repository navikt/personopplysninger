import "react-app-polyfill/ie9";
import "core-js/fn/array/includes";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import App from "js/App";
import api from "js/Api";
import nb from "react-intl/locale-data/nb";
import en from "react-intl/locale-data/en";
import { setUpMock } from "./mock-api";
import "css/index.css";

import nbMessages from "./translations/nb.json";
import enMessages from "./translations/en.json";

const messages = {
  nb: nbMessages,
  en: enMessages
};

const browserLanguage = navigator.language.split(/[-_]/)[0];
addLocaleData([...nb, ...en]);

if (process.env.NODE_ENV === "development") {
  setUpMock();
}

ReactDOM.render(
  // eslint-disable-line function-paren-newline
  <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
    <App api={api} />
  </IntlProvider>,
  document.getElementById("app")
);
