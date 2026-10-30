import { render, screen } from "@testing-library/react";
import Spinner from "@/components/spinner/Spinner";

describe("Spinner", () => {
    it("viser standard lastetekst", () => {
        render(<Spinner />);
        expect(screen.getByText("Laster innhold...")).toBeInTheDocument();
    });

    it("viser egendefinert tekst via prop", () => {
        render(<Spinner text="Henter data..." />);
        expect(screen.getByText("Henter data...")).toBeInTheDocument();
    });
});
