import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, vi } from "vitest";
import MedlSide from "@/pages/[locale]/medlemskap-i-folketrygden.astro";

vi.mock("@/server/apiClient", () => ({
    hentFraApi: vi.fn().mockResolvedValue({ status: "ERROR", error: { code: 500, text: "Feil fra API-et" } }),
    loginUrlFor: vi.fn(),
}));

vi.mock("@navikt/nav-dekoratoren-moduler/ssr", () => ({
    fetchDecoratorHtml: vi.fn().mockResolvedValue({ DECORATOR_HEAD_ASSETS: "", DECORATOR_HEADER: "", DECORATOR_FOOTER: "", DECORATOR_SCRIPTS: "" }),
}));

describe("Medlemskap i folketrygden", () => {
    it("viser feilmeldingen i siderammen når API-et feiler", async () => {
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const html = await container.renderToString(MedlSide, {
            params: { locale: "nb" },
            request: new Request("http://localhost:4321/person/personopplysninger/nb/medlemskap-i-folketrygden"),
        });

        expect(html).toMatch(/<main[^>]*>.*<h2.*Oisann, noe gikk galt ved henting av data!.*500: .*Feil fra API-et.*<\/main>/s);
    });
});
