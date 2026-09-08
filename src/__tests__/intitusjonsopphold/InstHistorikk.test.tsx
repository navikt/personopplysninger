import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import instInfo from "@/mocks/fixtures/inst-info.json";
import InstHistorikkView from "@/pages/institusjonsopphold/historikk/InstHistorikkView";
import nbMessages from "@/text/nb";

describe("InstHistorikkView", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <IntlProvider locale={"nb"} messages={nbMessages}>
                <InstHistorikkView instInfo={instInfo} pathname="/person/personopplysninger/nb/institusjonsopphold" />
            </IntlProvider>,
        );

        expect(screen.getAllByRole("link")[2]).toHaveAttribute(
            "href",
            "/person/personopplysninger/nb/institusjonsopphold/2018-12-19T11%3A03%3A57.507",
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it("shows updated empty-state and source text when there are no stays", () => {
        render(
            <IntlProvider locale={"nb"} messages={nbMessages}>
                <InstHistorikkView instInfo={[]} />
            </IntlProvider>,
        );

        expect(screen.getByText("Det er ingen institusjonsopphold å vise.")).toBeInTheDocument();
        expect(screen.getByText("KILDE: INSTITUSJONSOPPHOLDSREGISTERET")).toBeInTheDocument();
        expect(screen.getByText("Dataene er rapportert av institusjonen.")).toBeInTheDocument();
    });
});
