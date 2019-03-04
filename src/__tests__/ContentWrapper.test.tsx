import * as React from "react";
import * as ShallowRenderer from "react-test-renderer/shallow";
import ContentWrapper from "../js/ContentWrapper";
import wrapIntl from "../js/IntlTestHelper";
import personInfoMock from "../mock-api/personInfo.json";

const renderer = ShallowRenderer.createRenderer();
test("render ContentWrapper with content", () => {
  const result = renderer.render(
    wrapIntl(<ContentWrapper personInfo={personInfoMock} />)
  );
  expect(result).toMatchSnapshot();
});
