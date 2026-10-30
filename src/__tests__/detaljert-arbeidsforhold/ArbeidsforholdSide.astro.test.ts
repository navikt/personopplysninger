import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ArbeidsforholdSide from "@/pages/[locale]/arbeidsforhold/[id].astro";
import { hentFraApi } from "@/server/apiClient";

vi.mock("@/server/apiClient", () => ({
    hentFraApi: vi.fn(),
    loginUrlFor: vi.fn().mockReturnValue("/login"),
}));

vi.mock("@navikt/nav-dekoratoren-moduler/ssr", () => ({
    fetchDecoratorHtml: vi.fn().mockResolvedValue({ DECORATOR_HEAD_ASSETS: "", DECORATOR_HEADER: "", DECORATOR_FOOTER: "", DECORATOR_SCRIPTS: "" }),
}));

const personInfo = {
    status: "RESULT",
    data: {
        personalia: {
            fornavn: "Ola",
            etternavn: "Nordmann",
            personident: { verdi: "12345678901", type: "FNR" },
        },
    },
};

const options = {
    params: { locale: "nb", id: "1" },
    request: new Request("http://localhost:4321/person/personopplysninger/nb/arbeidsforhold/1"),
};

const render = async () => {
    const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });
    return container.renderToString(ArbeidsforholdSide, options);
};

const avkod = (value: string) =>
    value.replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&#39;", "'").replaceAll("&amp;", "&");

const islandProps = (html: string) => JSON.parse(avkod(html.match(/<astro-island[^>]*\sprops="([^"]*)"/)?.[1] ?? ""));

describe("Arbeidsforhold-detaljer", () => {
    beforeEach(() => {
        vi.mocked(hentFraApi).mockReset();
    });

    it("viser tittel, tilbakelenke og én øy med navn og fødselsnummer fra serveren", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo as never);

        const html = await render();

        expect(html).toMatch(/<h2[^>]*>Arbeidsforhold<\/h2>/);
        expect(html).toContain('href="/person/personopplysninger/nb/#arbeidsforhold"');
        expect(html.match(/<astro-island/g)).toHaveLength(1);
        expect(html).toMatch(/<astro-island[^>]*client="visible"/);
        const props = islandProps(html);
        expect(["customApiUrl", "locale", "miljo", "navArbeidsforholdId", "printName", "printSSN"]).toEqual(
            expect.arrayContaining(Object.keys(props)),
        );
        expect(props.navArbeidsforholdId).toEqual([0, 1]);
        expect(props.printName).toEqual([0, "Ola Nordmann"]);
        expect(props.printSSN).toEqual([0, "12345678901"]);
        expect(props.locale).toEqual([0, "nb"]);
        expect(props.miljo).toEqual([0, "LOCAL"]);
        expect(hentFraApi).toHaveBeenCalledTimes(1);
        expect(vi.mocked(hentFraApi).mock.calls[0][0]).toBe("/personalia");
    });

    it("viser øya med tomme utskriftsfelt når /personalia feiler", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce({ status: "ERROR", error: { code: 500, text: "Feil fra API-et" } });

        const html = await render();

        expect(html.match(/<astro-island/g)).toHaveLength(1);
        const props = islandProps(html);
        expect(props.printName).toEqual([0, ""]);
        expect(props.printSSN).toEqual([0, ""]);
    });

    it("sender til innlogging når API-et svarer 401", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce({ status: "UNAUTHORIZED" });
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const response = await container.renderToResponse(ArbeidsforholdSide, options);

        expect(response.status).toBe(302);
        expect(response.headers.get("location")).toBe("/login");
    });
});
