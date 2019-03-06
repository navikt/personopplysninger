import * as React from "react";
import ReactTestRenderer from "react-test-renderer";

test("basic green component snaphot-test", () => {
  const component = ReactTestRenderer.create(
    <div>Some very fancy component</div>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
