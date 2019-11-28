import React from "react";
import ReactDOM from "react-dom";
import wrapIntl from "./__utils__/IntlTestHelper";
import App from "App";
import { StoreProvider } from "providers/Provider";
import { initialState, reducer } from "providers/Store";

it("renders without crashing", () => {
  const Dom = (
    <StoreProvider initialState={initialState} reducer={reducer}>
      {wrapIntl(<App />)}
    </StoreProvider>
  );
  ReactDOM.render(Dom, document.createElement("div"));
});
