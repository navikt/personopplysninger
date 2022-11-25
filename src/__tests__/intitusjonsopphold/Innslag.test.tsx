import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import instInfo from "../../clients/apiMock/app/fetch/inst-info.json";
import Innslag from "../../pages/institusjonsopphold/detaljer/Innslag";

jest.mock("react-router-dom", () => ({
  Link: () => <div />,
  useLocation: () => ({
    pathname: "pathname",
  }),
}));

jest.mock("nav-frontend-hjelpetekst");

describe("Innslag", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <IntlProvider locale={"nb"} messages={nbMessages}>
          <Innslag innslag={instInfo[0]} />
        </IntlProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
