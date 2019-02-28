import * as React from "react";
import Error from "js/components/Error";
import wrapIntl from "js/IntlTestHelper";

const ReactTestRenderer = require("react-test-renderer");

test("render Error", () => {
  const component = ReactTestRenderer.create(
    wrapIntl(<Error error={{ code: 500, text: "Internal server error" }} />)
  );
  expect(component.toJSON()).toMatchSnapshot();
});
