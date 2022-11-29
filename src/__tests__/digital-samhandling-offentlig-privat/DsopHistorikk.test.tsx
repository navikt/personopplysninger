import "@testing-library/jest-dom";
import dsopInfo from "../../clients/apiMock/app/fetch/dsop-info.json";
import { IntlProvider } from "react-intl";
import nbMessages from "text/nb";
import DsopHistorikkView from "../../pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikkView";
import { render } from "@testing-library/react";
import moment from "moment-timezone";

moment.tz.setDefault("GMT+1");

jest.mock("react-router-dom", () => ({
  Link: () => <div />,
  useLocation: () => ({
    pathname: "pathname",
  }),
}));

describe("DsopHistorikkView", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <IntlProvider locale={"nb"} messages={nbMessages}>
        <DsopHistorikkView dsopInfo={dsopInfo} />
      </IntlProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
