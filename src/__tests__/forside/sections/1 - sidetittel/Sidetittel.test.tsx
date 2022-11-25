import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import Sidetittel from "../../../../pages/forside/sections/1-sidetittel/Sidetittel";

jest.mock("react-modal");
jest.mock("utils/validators");

describe("Sidetittel", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <IntlProvider locale={"nb"} messages={nbMessages}>
          <Sidetittel />
        </IntlProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
