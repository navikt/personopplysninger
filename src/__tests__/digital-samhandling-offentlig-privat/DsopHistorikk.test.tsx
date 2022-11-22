import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import dsopInfo from "../../clients/apiMock/app/fetch/dsop-info.json";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import DsopHistorikk from "../../pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikk";

jest.mock("react-router-dom", () => ({
  Link: () => <div />,
  useLocation: () => ({
    pathname: "pathname",
  }),
}));

describe("DsopHistorikk", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <IntlProvider locale={"nb"} messages={nbMessages}>
          <DsopHistorikk dsopInfo={dsopInfo} />
        </IntlProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
