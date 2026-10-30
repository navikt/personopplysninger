import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EndreKontonummerSide from "@/pages/[locale]/endre-kontonummer.astro";
import { hentFraApi } from "@/server/apiClient";
import { testRuntimeConfig } from "../utils/testRuntimeConfig";

vi.mock("@/server/apiClient", () => ({
    hentFraApi: vi.fn(),
    loginUrlFor: vi.fn().mockReturnValue("/login"),
}));

vi.mock("@/config/serverRuntimeConfig", async () => {
    const { testRuntimeConfig } = await import("../utils/testRuntimeConfig");
    return { getServerRuntimeConfig: () => testRuntimeConfig };
});

vi.mock("@navikt/nav-dekoratoren-moduler/ssr", () => ({
    fetchDecoratorHtml: vi.fn().mockResolvedValue({ DECORATOR_HEAD_ASSETS: "", DECORATOR_HEADER: "", DECORATOR_FOOTER: "", DECORATOR_SCRIPTS: "" }),
}));

const personInfo = (personalia: object = {}) => ({
    status: "RESULT",
    data: {
        personalia: {
            fornavn: "Ola",
            etternavn: "Nordmann",
            kontonr: "12345678901",
            kontoregisterStatus: "OK",
            personident: { verdi: "01010112345", type: "FNR" },
            ...personalia,
        },
    },
});

const render = async (search = "?backTo=%2F", headers: Record<string, string> = {}) => {
    const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });
    return container.renderToString(EndreKontonummerSide, {
        params: { locale: "nb" },
        request: new Request(`http://localhost:4321/person/personopplysninger/nb/endre-kontonummer${search}`, { headers }),
    });
};

const islandProps = (html: string) => {
    const props = html.match(/<astro-island[^>]*\sprops="([^"]*)"/)?.[1] ?? "";
    return JSON.parse(
        props.replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&#39;", "'").replaceAll("&amp;", "&"),
    );
};

describe("Endre kontonummer", () => {
    beforeEach(() => {
        vi.mocked(hentFraApi).mockReset();
    });

    it("viser tittel, tilbakelenke, info og øya med props", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo() as never);

        const html = await render();

        expect(html).toMatch(/<astro-island[^>]*client="visible"/);
        const props = islandProps(html);
        expect(props.kontonr).toEqual([0, "12345678901"]);
        expect(props.language).toEqual([0, "nb"]);
        expect(Object.keys(props).sort()).toEqual([
            "apiUrl",
            "appUrl",
            "endreKontonummerUrl",
            "kontonr",
            "language",
            "loginUrl",
            "personident",
            "utenlandskbank",
        ]);
        expect(props.apiUrl).toEqual([0, testRuntimeConfig.apiUrl]);
        expect(props.appUrl).toEqual([0, testRuntimeConfig.appUrl]);
        expect(props.loginUrl).toEqual([0, testRuntimeConfig.loginUrl]);
        expect(props.endreKontonummerUrl).toEqual([0, testRuntimeConfig.endreKontonummerUrl]);
        expect(html).toContain("Endre kontonummer for utbetaling");
        expect(html).toContain('href="/person/personopplysninger/nb/#utbetaling"');
        expect(html).toMatch(
            /Du kan ikke endre kontonummer for økonomisk sosialhjelp eller andre kommunale tjenester her\. <a[^>]*href="https:\/\/www\.nav\.no\/kontonummer#kommune"/,
        );
    });

    it("tegner sideikonet som bakgrunnsbilde på en sirkel", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo() as never);

        const html = await render();

        expect(html).toMatch(/<div class="[^"]*circle[^"]*" style="[^"]*background-image:\s*url\([^)]+\)[^"]*"/);
        expect(html).toMatch(/style="[^"]*background-color:\s*#99C1E9/i);
        expect(html).not.toContain("ikonSirkel");
    });

    it("bruker tom backTo uten gyldig ?backTo", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo() as never);
        expect(await render("")).toContain('href="/person/personopplysninger/nb#utbetaling"');

        for (const backTo of ["//evil", "https%3A%2F%2Fevil.example", "foo"]) {
            vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo() as never);
            expect(await render(`?backTo=${backTo}`)).toContain('href="/person/personopplysninger/nb#utbetaling"');
        }
    });

    it("viser feil og ingen øy når kontoregisteret feiler", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo({ kontoregisterStatus: "ERROR" }) as never);

        const html = await render();

        expect(html).toContain("Det skjedde en feil ved henting av kontoinformasjon. Prøv igjen senere.");
        expect(html).not.toContain("<astro-island");
    });

    it("viser personaliaboks med feil når personalia feiler", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce({ status: "ERROR", error: { code: 500, text: "Feil fra API-et" } } as never);

        const html = await render();

        expect(html).toContain("Personalia");
        expect(html).toContain("Oisann, noe gikk galt ved henting av data!");
        expect(html).toContain("500: ");
        expect(html).not.toContain("<astro-island");
    });

    it("sender til innlogging når brukeren ikke er logget inn", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce({ status: "UNAUTHORIZED" } as never);
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const response = await container.renderToResponse(EndreKontonummerSide, {
            params: { locale: "nb" },
            request: new Request("http://localhost:4321/person/personopplysninger/nb/endre-kontonummer"),
        });

        expect(response.status).toBe(302);
        expect(response.headers.get("location")).toBe("/login");
    });

    it("viser suksessmelding fra cookie før øya", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo() as never);

        const html = await render("?backTo=%2F", { cookie: "kontonr-result=success" });

        expect(html).toMatch(
            /<p[^>]*>Du har endret kontonummeret ditt\.<\/p>\s*<p[^>]*>Nav vil sende deg et varsel om endringen på SMS og\/eller e-post\.<\/p>/,
        );
        expect(html.indexOf("Du har endret kontonummeret ditt.")).toBeLessThan(html.indexOf("<astro-island"));
    });

    it("viser feilmelding fra cookie", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo() as never);

        const html = await render("?backTo=%2F", { cookie: "kontonr-result=error" });

        expect(html).toContain("Det oppsto en feil ved endring av kontonummer.");
    });

    it("ignorerer ukjent cookieverdi", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce(personInfo() as never);

        const html = await render("?backTo=%2F", { cookie: "kontonr-result=noe-annet" });

        expect(html).not.toContain("Du har endret kontonummeret ditt.");
        expect(html).not.toContain("Det oppsto en feil ved endring av kontonummer.");
    });

    it("viser feil uten resultatmelding når personalia feiler selv med cookie", async () => {
        vi.mocked(hentFraApi).mockResolvedValueOnce({ status: "ERROR", error: { code: 500, text: "Feil fra API-et" } } as never);
        const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });

        const response = await container.renderToResponse(EndreKontonummerSide, {
            params: { locale: "nb" },
            request: new Request("http://localhost:4321/person/personopplysninger/nb/endre-kontonummer", {
                headers: { cookie: "kontonr-result=success" },
            }),
        });
        const html = await response.text();

        expect(html).toContain("Oisann, noe gikk galt ved henting av data!");
        expect(html).not.toContain("Du har endret kontonummeret ditt.");
    });
});
