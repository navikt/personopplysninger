import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import nb from "react-intl/locale-data/nb";
import App from "../App";
import nbMessages from "../text/nb";

const browserLanguage = "nb";
const messages = {
  nb: nbMessages
};

addLocaleData([...nb]);
jest.mock("react-dom", () => ({ render: jest.fn() }));

it("index renders without crashing", () => {
  require("../index");
  const content = (
    <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
      <App />
    </IntlProvider>
  );
  expect(ReactDOM.render).toHaveBeenCalledWith(content, null);
});
