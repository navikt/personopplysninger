import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, vi } from "vitest";
import InstDetaljerSide from "@/pages/[locale]/institusjonsopphold/[id].astro";
import InstSide from "@/pages/[locale]/institusjonsopphold/index.astro";

vi.mock("@/server/apiClient", () => ({
    hentFraApi: vi.fn().mockResolvedValue({ status: "ERROR", error: { code: 500, text: "Feil fra API-et" } }),
    loginUrlFor: vi.fn(),
}));

vi.mock("@navikt/nav-dekoratoren-moduler/ssr", () => ({
    fetchDecoratorHtml: vi.fn().mockResolvedValue({ DECORATOR_HEAD_ASSETS: "", DECORATOR_HEADER: "", DECORATOR_FOOTER: "", DECORATOR_SCRIPTS: "" }),
}));

describe("Institusjonsoppholdssidene", () => {
    it("viser feilmeldingen i siderammen på oversikten når API-et feiler", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(InstSide, {
            params: { locale: "nb" },
            request: new Request("http://localhost:4321/person/personopplysninger/nb/institusjonsopphold"),
        });

        expect(html).toMatch(/<main[^>]*>.*<h2.*Oisann, noe gikk galt ved henting av data!.*500: .*Feil fra API-et.*<\/main>/s);
    });

    it("viser feilmeldingen i siderammen på detaljsiden når API-et feiler", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(InstDetaljerSide, {
            params: { locale: "nb", id: "x" },
            request: new Request("http://localhost:4321/person/personopplysninger/nb/institusjonsopphold/x"),
        });

        expect(html).toMatch(/<main[^>]*>.*<h2.*Oisann, noe gikk galt ved henting av data!.*500: .*Feil fra API-et.*<\/main>/s);
    });
});
