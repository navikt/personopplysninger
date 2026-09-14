import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import dsopInfo from "@/mocks/fixtures/dsop-info.json";
import DsopHistorikkView from "@/pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikkView";
import nbMessages from "@/text/nb";

describe("DsopHistorikkView", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <IntlProvider locale={"nb"} messages={nbMessages}>
                <DsopHistorikkView dsopInfo={dsopInfo} pathname="/person/personopplysninger/nb/dsop" />
            </IntlProvider>,
        );

        expect(screen.getAllByRole("link")[1]).toHaveAttribute("href", "/person/personopplysninger/nb/dsop/2019-06-18T10%3A45%3A51.634");
        expect(asFragment()).toMatchSnapshot();
    });
});
