import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import { StoreProvider } from "store/Context";
import { initialState, reducer } from "store/Store";
import nb from "react-intl/locale-data/nb";
import nbMessages from "text/nb";
import App from "App";

const browserLanguage = "nb";
const messages = {
  nb: nbMessages
};

addLocaleData([...nb]);
jest.mock("react-dom", () => ({ render: jest.fn() }));

it("index renders without crashing", () => {
  require("index");
  const content = (
    <IntlProvider locale={browserLanguage} messages={messages[browserLanguage]}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <App />
      </StoreProvider>
    </IntlProvider>
  );
  expect(ReactDOM.render).toHaveBeenCalledWith(content, null);
});
