import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import nb from "react-intl/locale-data/nb";
import App from "../App";
import nbMessages from "../text/nb";
import { StoreProvider } from "../providers/Provider";
import { initialState, reducer } from "../providers/Store";

const browserLanguage = "nb";
const messages = {
  nb: nbMessages
};

addLocaleData([...nb]);
jest.mock("react-dom", () => ({ render: jest.fn() }));

it("index renders without crashing", () => {
  require("../index");
  expect(ReactDOM.render).toHaveBeenCalledWith(
    <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <App />
      </StoreProvider>
    </IntlProvider>,
    null
  );
});
