import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import type { Adresse as IAdresse } from "@/types/adresser/adresse";
import Adresse from "@/views/forside/adresser/Adresse.astro";

const postboks: IAdresse = { type: "POSTBOKSADRESSE", postboks: "Postboks 10 Sørstrand", postnummer: "0194", poststed: "OSLO" };
const vegadresse: IAdresse = {
    type: "VEGADRESSE",
    adressenavn: "JØRGENSENVEIEN",
    husnummer: "14",
    kommune: "EVJE OG HORNNES",
    postnummer: "0194",
    poststed: "OSLO",
};

const render = async (props: Partial<Parameters<typeof Adresse>[0]>) => {
    const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });
    return container.renderToString(Adresse, { props: { language: "nb", tittel: "Bostedsadresse", ...props } });
};

describe("Adresse", () => {
    it("viser ikke detaljer når flyttedato mangler, selv om gyldig til og med finnes", async () => {
        const html = await render({ adresse: postboks, gyldigTilOgMed: "2020-07-20T23:59:59" });

        expect(html).toContain("Postboks 10 Sørstrand");
        expect(html).not.toContain("<details");
        expect(html).not.toContain("Gyldig til og med");
    });

    it("viser detaljer med flyttedato og gyldig til og med når flyttedatoen finnes", async () => {
        const html = await render({ adresse: postboks, angittFlyttedato: "2020-07-14", gyldigTilOgMed: "2020-07-20T23:59:59" });

        expect(html).toContain("<details");
        expect(html).toContain("14.07.2020");
        expect(html).toContain("20.07.2020");
    });

    it("viser kommunen i detaljene for en vegadresse", async () => {
        const html = await render({ adresse: vegadresse });

        expect(html).toContain("<details");
        expect(html).toContain("EVJE OG HORNNES");
    });

    it("viser stedet i stedet for adresse når bare oppholdAnnetSted finnes", async () => {
        const html = await render({ oppholdAnnetSted: "PAA_SVALBARD" });

        expect(html).toContain("På Svalbard");
        expect(html).not.toContain("<details");
    });
});
