import { render, screen } from "@testing-library/react";
import HttpFeilmelding from "@/components/httpFeilmelding/HttpFeilmelding";
import { PAAGAAENDE_ENDRING, text } from "@/components/httpFeilmelding/httpFeilmeldingText";

describe("HttpFeilmelding", () => {
    it("viser teksten for pågående endring på valgt språk", () => {
        render(<HttpFeilmelding code={400} type="feil" text={PAAGAAENDE_ENDRING} language="en" />);

        expect(screen.getByText(text.paagaaendeEndring.en)).toBeInTheDocument();
    });

    it("viser andre tekster slik de kommer", () => {
        render(<HttpFeilmelding code={500} type="feil" text="Oisann, noe gikk galt! Prøv igjen senere." language="en" />);

        expect(screen.getByText("Oisann, noe gikk galt! Prøv igjen senere.")).toBeInTheDocument();
    });
});
