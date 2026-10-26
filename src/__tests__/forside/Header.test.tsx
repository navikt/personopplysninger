import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import spinnerStyles from "@/components/spinner/Spinner.module.css";
import { StoreContext } from "@/store/Context";
import { initialState } from "@/store/Store";
import nbMessages from "@/text/nb";
import type { FetchAuth } from "@/types/authInfo";
import Header from "@/views/forside/sections/3-header/Header";

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
    it("viser lasteindikator", () => {
        const { container } = renderHeader({ status: "LOADING" });
        expect(screen.getByText("Laster innhold...")).toBeInTheDocument();
        expect(container.firstElementChild).toHaveClass(spinnerStyles.wrapper);
    });

    it("dekorativt veilederbilde har tom alt-tekst", () => {
        const { container } = renderHeader({
            status: "RESULT",
            data: { authenticated: true, securityLevel: "4", name: "KARI NORDMANN" },
        });
        expect(container.querySelector("img")).toHaveAttribute("alt", "");
    });

    it("personvern-lenken åpner i ny fane", () => {
        const { container } = renderHeader({
            status: "RESULT",
            data: { authenticated: true, securityLevel: "4", name: "KARI NORDMANN" },
        });
        expect(container.querySelector('a[href="/personvern"]')).toHaveAttribute("target", "_blank");
    });
});
