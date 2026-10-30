import { render, screen } from "@testing-library/react";
import HttpFeilmelding from "@/components/httpFeilmelding/HttpFeilmelding";
import { PAAGAAENDE_ENDRING } from "@/components/httpFeilmelding/httpFeilmeldingText";
import enMessages from "@/text/en";

describe("HttpFeilmelding", () => {
    it("viser teksten for pågående endring på valgt språk", () => {
        render(<HttpFeilmelding code={400} type="feil" text={PAAGAAENDE_ENDRING} language="en" />);

        expect(screen.getByText(enMessages["personalia.tlfnr.paagaaendeendring.feilmelding"])).toBeInTheDocument();
    });

    it("viser andre tekster slik de kommer", () => {
        render(<HttpFeilmelding code={500} type="feil" text="Oisann, noe gikk galt! Prøv igjen senere." language="en" />);

        expect(screen.getByText("Oisann, noe gikk galt! Prøv igjen senere.")).toBeInTheDocument();
    });
});
