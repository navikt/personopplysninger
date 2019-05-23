import React from "react";
import ReactDOM from "react-dom";
import wrapIntl from "./__utils__/IntlTestHelper";
import App from "../App";
import { StateProvider } from "../providers/Provider";
import { initialState, reducer } from "../providers/Store";

it("renders without crashing", () => {
  ReactDOM.render(
    <StateProvider initialState={initialState} reducer={reducer}>
      {wrapIntl(<App />)}
    </StateProvider>,
    document.createElement("div")
  );
});
