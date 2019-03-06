import * as React from "react";
import ReactTestRenderer from "react-test-renderer";
import Error from "../js/components/Error";
import wrapIntl from "../js/IntlTestHelper";

test("render Error", () => {
  const component = ReactTestRenderer.create(
    wrapIntl(<Error error={{ code: "500", text: "Internal Server Error" }} />)
  );
  expect(component.toJSON()).toMatchSnapshot();
});
