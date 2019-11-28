import * as React from "react";
import ReactTestRenderer from "react-test-renderer";
import wrapIntl from "./__utils__/IntlTestHelper";
import Box from "components/box/Box";
import adresse from "assets/img/Adresse.svg";

test("render Header with content", () => {
  const component = ReactTestRenderer.create(
    wrapIntl(
      <Box
        id="adresse"
        tittel="adresse.tittel"
        beskrivelse="adresse.beskrivelse"
        icon={adresse}
      >
        <h3>Header</h3>
        <div>content</div>
      </Box>
    )
  );
  expect(component.toJSON()).toMatchSnapshot();
});
