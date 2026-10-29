import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, vi } from "vitest";
import personInfoFixture from "@/mocks/fixtures/person-info.json";
import Forside from "@/pages/[locale]/index.astro";
import { hentFraApi } from "@/server/apiClient";
import type { PersonInfo } from "@/types/personInfo";

vi.mock("@/server/apiClient", () => ({
    hentFraApi: vi.fn(),
    loginUrlFor: vi.fn().mockReturnValue("/person/personopplysninger/oauth2/login?redirect=/person/personopplysninger/nb/"),
}));

vi.mock("@navikt/nav-dekoratoren-moduler/ssr", () => ({
    fetchDecoratorHtml: vi.fn().mockResolvedValue({ DECORATOR_HEAD_ASSETS: "", DECORATOR_HEADER: "", DECORATOR_FOOTER: "", DECORATOR_SCRIPTS: "" }),
}));

const personInfo = personInfoFixture as unknown as PersonInfo;
const feil = { status: "ERROR" as const, error: { code: 500, text: "Feil fra API-et" } };
const request = new Request("http://localhost:4321/person/personopplysninger/nb/");

const render = async () => {
    const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });
    return container.renderToString(Forside, { params: { locale: "nb" }, request });
};

describe("Forsiden", () => {
    it("viser hilsen med navn og personalia fra serveren", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: personInfo });

        const html = await render();

        expect(html).toContain("Hei Vinayagum-mask Amizic!");
        expect(html).toContain("VINAYAGUM-MASK");
        expect(html).toContain("101080 00398");
        expect(html).toMatch(/id="personalia"/);
    });

    it("viser feilmeldingen i personalia-boksen og resten av siden når /personalia feiler", async () => {
        vi.mocked(hentFraApi).mockResolvedValue(feil);

        const html = await render();

        expect(html).toContain("Hei!");
        expect(html).toMatch(/id="personalia".*Oisann, noe gikk galt ved henting av data!.*500: .*Feil fra API-et/s);
        expect(html).toMatch(/id="flere-opplysninger"/);
    });

    it("sender til innlogging når API-et svarer 401", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "UNAUTHORIZED" });
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const response = await container.renderToResponse(Forside, { params: { locale: "nb" }, request });

        expect(response.status).toBe(302);
        expect(response.headers.get("location")).toContain("/oauth2/login");
    });
});
