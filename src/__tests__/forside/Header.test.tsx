import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import Header from "@/pages/forside/sections/3-header/Header";
import headerStyles from "@/pages/forside/sections/3-header/Header.module.css";
import { StoreContext } from "@/store/Context";
import { initialState } from "@/store/Store";
import nbMessages from "@/text/nb";
import type { FetchAuth } from "@/types/authInfo";

vi.mock("react-modal");

const renderHeader = (authInfo: FetchAuth) => {
    const mockDispatch = vi.fn();
    return render(
        <StoreContext.Provider value={[{ ...initialState, authInfo }, mockDispatch]}>
            <IntlProvider locale="nb" messages={nbMessages}>
                <Header />
            </IntlProvider>
        </StoreContext.Provider>,
    );
};

describe("Header", () => {
    describe("LOADING-tilstand", () => {
        it("viser lasteindikator", () => {
            renderHeader({ status: "LOADING" });
            expect(screen.getByText("Laster innhold...")).toBeInTheDocument();
        });
    });

    describe("RESULT-tilstand", () => {
        const authResult: FetchAuth = {
            status: "RESULT",
            data: { authenticated: true, securityLevel: "4", name: "KARI NORDMANN" },
        };

        it("bruker CSS Module-klassen på rot-elementet", () => {
            const { container } = renderHeader(authResult);
            expect(container.firstElementChild).toHaveClass(headerStyles.header);
        });

        it("dekorativt veilederbilde har tom alt-tekst (a11y)", () => {
            const { container } = renderHeader(authResult);
            const veileder = container.querySelector("img");
            expect(veileder).toHaveAttribute("alt", "");
        });
    });
});
