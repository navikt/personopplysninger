import React from "react";
import ReactDOM from "react-dom";
import wrapIntl from "./__utils__/IntlTestHelper";
import App from "../App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(wrapIntl(<App />), div);
});
