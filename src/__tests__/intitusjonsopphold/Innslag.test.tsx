import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import instInfo from "../../clients/apiMock/app/fetch/inst-info.json";
import InstDetaljerView from "../../pages/institusjonsopphold/detaljer/InstDetaljerView";

jest.mock("react-router-dom", () => ({
  Link: () => <div />,
  useLocation: () => ({
    pathname: "pathname",
  }),
}));

jest.mock("nav-frontend-hjelpetekst");

describe("InstDetaljerView", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <IntlProvider locale={"nb"} messages={nbMessages}>
          <InstDetaljerView innslag={instInfo[0]} />
        </IntlProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
