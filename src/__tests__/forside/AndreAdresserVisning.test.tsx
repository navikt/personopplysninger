import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { StoreProvider } from "@/store/Context";
import nbMessages from "@/text/nb";
import type { PersonInfo } from "@/types/personInfo";
import AndreAdresserVisning from "@/views/forside/sections/4-personinfo/3-adresser/visning/AndreAdresserVisning";

vi.mock("react-modal");

const postboks = { type: "POSTBOKSADRESSE" as const, postboks: "Postboks 10 Sørstrand", postnummer: "0194", poststed: "OSLO" };

const renderVisning = (initialPersonInfo: PersonInfo) =>
    render(
        <StoreProvider initialLocale="nb" initialPersonInfo={initialPersonInfo}>
            <IntlProvider locale="nb" messages={nbMessages}>
                <AndreAdresserVisning />
            </IntlProvider>
        </StoreProvider>,
    );

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
});
