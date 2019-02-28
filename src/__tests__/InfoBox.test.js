import * as React from "react";
import wrapIntl from "js/IntlTestHelper";
import InfoBox from "js/components/InfoBox";

const ReactTestRenderer = require("react-test-renderer");

test("render InfoBox with content", () => {
  const component = ReactTestRenderer.create(
    wrapIntl(
      <InfoBox>
        <h2>Header</h2>
        <div className="info-content">Innhold</div>
      </InfoBox>
    )
  );
  expect(component.toJSON()).toMatchSnapshot();
});
