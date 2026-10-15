import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { fetchInnloggingsStatus } from "@/clients/apiClient";
import Header from "@/pages/forside/sections/3-header/Header";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";

vi.mock("react-modal");
vi.mock("@/clients/apiClient", () => ({ fetchInnloggingsStatus: vi.fn() }));

describe("Header-hilsen", () => {
    it("henter navnet fra innloggingsstatus når innloggingen ikke har med navn", async () => {
        vi.mocked(fetchInnloggingsStatus).mockResolvedValue({
            authenticated: true,
            securityLevel: "4",
            name: "KARI NORDMANN",
        });

        render(
            <StoreProvider initialAuthInfo={{ status: "RESULT", data: { authenticated: true, securityLevel: "4", name: "" } }}>
                <IntlProvider locale="nb" messages={nbMessages}>
                    <Header />
                </IntlProvider>
            </StoreProvider>,
        );

        expect(await screen.findByText(/Kari/)).toBeInTheDocument();
        expect(fetchInnloggingsStatus).toHaveBeenCalledTimes(1);
    });

    it("henter ikke innloggingsstatus når navnet allerede finnes", () => {
        vi.mocked(fetchInnloggingsStatus).mockClear();

        render(
            <StoreProvider initialAuthInfo={{ status: "RESULT", data: { authenticated: true, securityLevel: "4", name: "OLA NORDMANN" } }}>
                <IntlProvider locale="nb" messages={nbMessages}>
                    <Header />
                </IntlProvider>
            </StoreProvider>,
        );

        expect(screen.getByText(/Ola/)).toBeInTheDocument();
        expect(fetchInnloggingsStatus).not.toHaveBeenCalled();
    });
});
