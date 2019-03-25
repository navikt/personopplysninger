import * as React from "react";
import ReactTestRenderer from "react-test-renderer";
import wrapIntl from "./__utils__/IntlTestHelper";
import Box from "../components/box/Box";

test("render Header with content", () => {
  const component = ReactTestRenderer.create(
    wrapIntl(
      <Box id="arbeidsforhold" header="Arbeidsforhold">
        <h3>Header</h3>
        <div>content</div>
      </Box>
    )
  );
  expect(component.toJSON()).toMatchSnapshot();
});
