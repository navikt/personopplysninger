import "react-app-polyfill/ie9";
import "core-js/fn/array/includes";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import nb from "react-intl/locale-data/nb";
import { setUpMock } from "./clients/apiMock";
import App from "./App";
import "css/index.css";

import nbMessages from "./translations/nb";

interface Messages {
  [key: string]: { [key: string]: string };
}

const browserLanguage = "nb";
const messages: Messages = {
  nb: nbMessages
};

addLocaleData([...nb]);

if (process.env.NODE_ENV === "development") {
  setUpMock();
}

ReactDOM.render(
  <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
    <App />
  </IntlProvider>,
  document.getElementById("app")
);
