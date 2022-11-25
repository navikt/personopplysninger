import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import Tabell from "../../pages/institusjonsopphold/historikk/Tabell";
import instInfo from "../../clients/apiMock/app/fetch/inst-info.json";

jest.mock("react-router-dom", () => ({
  Link: () => <div />,
  useLocation: () => ({
    pathname: "pathname",
  }),
}));

jest.mock("nav-frontend-hjelpetekst");

describe("Tabell", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <IntlProvider locale={"nb"} messages={nbMessages}>
          <Tabell instInfo={instInfo} />
        </IntlProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
