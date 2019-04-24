import React from "react";
import ReactTestRenderer from "react-test-renderer";
import Header from "../sections/3-header/Header";
import wrapIntl from "./__utils__/IntlTestHelper";

test("render Header with content", () => {
  const component = ReactTestRenderer.create(
    wrapIntl(<Header fornavn="Donald" />)
  );
  expect(component.toJSON()).toMatchSnapshot();
});
