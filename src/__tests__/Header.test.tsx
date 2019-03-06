import React from "react";
import ReactTestRenderer from "react-test-renderer";
import Header from "../js/components/Header";
import wrapIntl from "../js/IntlTestHelper";

test("render Header with content", () => {
  const component = ReactTestRenderer.create(
    wrapIntl(<Header fornavn="Donald" />)
  );
  expect(component.toJSON()).toMatchSnapshot();
});
