import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import instInfo from "@/mocks/fixtures/inst-info.json";
import InstHistorikkView from "@/pages/institusjonsopphold/historikk/InstHistorikkView";
import nbMessages from "@/text/nb";

vi.mock("react-router-dom", () => ({
    Link: () => <div />,
    useLocation: () => ({
        pathname: "pathname",
    }),
}));

describe("InstHistorikkView", () => {
    it("renders correctly", () => {
        const { asFragment } = render(
            <IntlProvider locale={"nb"} messages={nbMessages}>
                <InstHistorikkView instInfo={instInfo} />
            </IntlProvider>,
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
