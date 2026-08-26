import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import dsopInfo from "@/clients/apiMock/app/fetch/dsop-info.json";
import DsopHistorikkView from "@/pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikkView";
import nbMessages from "@/text/nb";

vi.mock("react-router-dom", () => ({
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
            </IntlProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
