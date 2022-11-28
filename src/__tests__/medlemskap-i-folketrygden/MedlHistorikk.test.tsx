import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import MedlHistorikkView from "../../pages/medlemskap-i-folketrygden/MedlHistorikkView";
import medlInfo from "../../clients/apiMock/app/fetch/medl-info.json";
import { MedlInfo } from "../../types/medl";

jest.mock("react-router-dom", () => ({
  Link: () => <div />,
  useLocation: () => ({
    pathname: "pathname",
  }),
}));
jest.mock("nav-frontend-js-utils", () => ({
  ...jest.requireActual("nav-frontend-js-utils"),
  guid: () => "Mocked UUID",
}));

jest.mock("nav-frontend-hjelpetekst");

describe("MedlHistorikkView", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <IntlProvider locale={"nb"} messages={nbMessages}>
          <MedlHistorikkView medlInfo={medlInfo as unknown as MedlInfo} />
        </IntlProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
