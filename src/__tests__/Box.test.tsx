import * as React from "react";
import ReactTestRenderer from "react-test-renderer";
import wrapIntl from "../js/IntlTestHelper";
import Box from "../js/components/Box";

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
