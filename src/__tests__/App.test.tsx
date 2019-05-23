import React from "react";
import ReactDOM from "react-dom";
import wrapIntl from "./__utils__/IntlTestHelper";
import App from "../App";
import { StoreProvider } from "../providers/Provider";
import { initialState, reducer } from "../providers/Store";

it("renders without crashing", () => {
  ReactDOM.render(
    <StoreProvider initialState={initialState} reducer={reducer}>
      {wrapIntl(<App />)}
    </StoreProvider>,
    document.createElement("div")
  );
});
