import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import Spinner from "@/components/spinner/Spinner";
import nbMessages from "@/text/nb";

const wrapper = ({ children }: { children: ReactNode }) => (
    <IntlProvider locale="nb" messages={nbMessages}>
        {children}
    </IntlProvider>
);

describe("Spinner", () => {
    it("viser standard lastetekst", () => {
        render(<Spinner />, { wrapper });
        expect(screen.getByText("Laster innhold...")).toBeInTheDocument();
    });

    it("viser egendefinert tekst via prop", () => {
        render(<Spinner text="Henter data..." />, { wrapper });
        expect(screen.getByText("Henter data...")).toBeInTheDocument();
    });
});
