import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Adresser } from "@/types/adresser";
import AndreAdresserVisning from "@/views/forside/sections/4-personinfo/3-adresser/visning/AndreAdresserVisning";

vi.mock("react-modal");

const postboks = { type: "POSTBOKSADRESSE" as const, postboks: "Postboks 10 Sørstrand", postnummer: "0194", poststed: "OSLO" };

const renderVisning = ({ adresser }: { adresser: Adresser }) =>
    render(<AndreAdresserVisning adresser={adresser} hentPaaNytt={() => Promise.resolve()} language="nb" />);

describe("AndreAdresserVisning", () => {
    it("viser ingenting når ingen av adressene kommer fra PDL", () => {
        const { container } = renderVisning({
            adresser: { kontaktadresser: [{ kilde: "freg", adresse: postboks }], oppholdsadresser: [{ kilde: "freg", adresse: postboks }] },
        });

        expect(container).toBeEmptyDOMElement();
    });

    it("viser de øvrige adressene når bare kontaktadressen kommer fra PDL", () => {
        renderVisning({ adresser: { kontaktadresser: [{ kilde: "pdl", adresse: postboks }] } });

        expect(screen.getByRole("heading", { level: 3, name: "Øvrige registrerte adresser" })).toBeInTheDocument();
    });

    it("viser de øvrige adressene når bare oppholdsadressen kommer fra PDL", () => {
        renderVisning({ adresser: { kontaktadresser: [], oppholdsadresser: [{ kilde: "pdl", adresse: postboks }] } });

        expect(screen.getByRole("heading", { level: 3, name: "Øvrige registrerte adresser" })).toBeInTheDocument();
    });

    it("viser detaljene om kontaktadressen når de åpnes", async () => {
        const vegadresse = { type: "VEGADRESSE" as const, adressenavn: "Storgata", husnummer: "1", kommune: "Oslo" };
        renderVisning({ adresser: { kontaktadresser: [{ kilde: "pdl", adresse: vegadresse, gyldigTilOgMed: "2030-01-31" }] } });

        await userEvent.click(screen.getByRole("button", { name: "Vis detaljer" }));

        expect(screen.getByRole("button", { name: "Skjul detaljer" })).toBeInTheDocument();
        expect(screen.getByText("Gyldig til og med")).toBeInTheDocument();
        expect(screen.getByText("31.01.2030")).toBeInTheDocument();
    });

    it("viser spørsmålet om sletting med linjeskift", async () => {
        renderVisning({ adresser: { kontaktadresser: [{ kilde: "pdl", adresse: postboks }] } });

        await userEvent.click(screen.getByRole("button", { name: "Slett kontaktadresse" }));

        const sporsmal = screen.getByText(/Vil du fjerne kontaktadressen/);
        expect(sporsmal.innerHTML).toBe("Vil du fjerne kontaktadressen og bruke folkeregistrert <br>adresse til å motta post fra Nav?");
    });
});
