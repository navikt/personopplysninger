import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import personInfoFixture from "@/mocks/fixtures/person-info.json";
import EndreOpplysninger from "@/pages/[locale]/endre-opplysninger/sendt-fra/[...route].astro";
import { hentFraApi, loginUrlFor } from "@/server/apiClient";
import type { PersonInfo } from "@/types/personInfo";
import { testKlientConfig } from "../utils/testConfig";

vi.mock("@/server/apiClient", () => ({
    hentFraApi: vi.fn(),
    loginUrlFor: vi.fn().mockReturnValue("/login"),
}));

vi.mock("astro:env/server", async (importOriginal) => {
    const { testEnv } = await import("../utils/testConfig");
    return { ...(await importOriginal<object>()), ...testEnv };
});

vi.mock("@navikt/nav-dekoratoren-moduler/ssr", () => ({
    fetchDecoratorHtml: vi.fn().mockResolvedValue({ DECORATOR_HEAD_ASSETS: "", DECORATOR_HEADER: "", DECORATOR_FOOTER: "", DECORATOR_SCRIPTS: "" }),
}));

const personInfo = personInfoFixture as unknown as PersonInfo;
const redirectUrl = "https%3A%2F%2Fwww.nav.no%2Fpselv%2Ftransaksjon%2Fminprofil.jsf";
const route = `skjema/alderspensjon/${redirectUrl}`;

const renderMedRute = async (rute: string) => {
    const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });
    return container.renderToResponse(EndreOpplysninger, {
        params: { locale: "nb", route: rute },
        request: new Request(`http://localhost:4321/person/personopplysninger/nb/endre-opplysninger/sendt-fra/${rute}`),
    });
};

const render = async (rute = route) => (await renderMedRute(rute)).text();

const avkod = (verdi: string) =>
    verdi.replaceAll("&quot;", '"').replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&#39;", "'").replaceAll("&amp;", "&");

const hent = (verdi: unknown): unknown => {
    if (!Array.isArray(verdi)) {
        return verdi;
    }
    const [type, innhold] = verdi;
    if (type === 1) {
        return (innhold as unknown[]).map(hent);
    }
    if (innhold && typeof innhold === "object") {
        return Object.fromEntries(Object.entries(innhold).map(([nokkel, v]) => [nokkel, hent(v)]));
    }
    return innhold;
};

const oyer = (html: string) =>
    [...html.matchAll(/<astro-island[^>]*>/g)].map(([tag]) => ({
        url: tag.match(/component-url="([^"]*)"/)?.[1] ?? "",
        props: hent([0, JSON.parse(avkod(tag.match(/\sprops="([^"]*)"/)?.[1] ?? "{}"))]) as Record<string, unknown>,
    }));

const medAdresser = (kontakt: object[], opphold: object[]): PersonInfo => ({
    ...personInfo,
    adresser: { ...personInfo.adresser, kontaktadresser: kontakt, oppholdsadresser: opphold } as unknown as PersonInfo["adresser"],
});

const kontaktFreg = { ...personInfo.adresser!.kontaktadresser[0], kilde: "freg" };
const kontaktPdl = { ...personInfo.adresser!.kontaktadresser[0], kilde: "pdl" };
const oppholdFreg = { ...personInfo.adresser!.oppholdsadresser![0], kilde: "freg" };
const oppholdPdl = { ...personInfo.adresser!.oppholdsadresser![0], kilde: "pdl" };

describe("Endre opplysninger (sendt fra)", () => {
    beforeEach(() => vi.stubEnv("BASE_URL", "/person/personopplysninger/"));
    afterEach(() => vi.unstubAllEnvs());

    beforeEach(() => {
        vi.mocked(hentFraApi).mockReset();
        vi.mocked(loginUrlFor).mockClear();
    });

    it("viser banner med lenke tilbake og boksene for kontaktinformasjon, adresser og utbetaling", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: personInfo });

        const html = await render();

        expect(html).toContain("Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre <b>kontaktinformasjon og kontonummer</b>.");
        expect(html).toContain('<a href="https://www.nav.no/pselv/transaksjon/minprofil.jsf">Gå tilbake til alderspensjon</a>');
        expect(html).toContain('alt="Veileder"');
        expect(html).toContain('id="kontaktinformasjon"');
        expect(html).toContain('id="adresser"');
        expect(html).toContain('id="utbetaling"');
        expect(html).toMatch(/<div class="_page_\w+"><div class="_container_\w+ pagecontent">/);
        expect(html.indexOf("Gå tilbake til alderspensjon")).toBeLessThan(html.indexOf('id="kontaktinformasjon"'));
        expect(html.indexOf('id="kontaktinformasjon"')).toBeLessThan(html.indexOf('id="adresser"'));
        expect(html.indexOf('id="adresser"')).toBeLessThan(html.indexOf('id="utbetaling"'));
    });

    it("henter bare personalia og sender telefonøya uten overskrift", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: personInfo });

        const html = await render();
        const telefon = oyer(html).find((oy) => oy.url.includes("TelefonnummerOy"));

        expect(vi.mocked(hentFraApi).mock.calls.map(([sti]) => sti)).toEqual(["/personalia"]);
        expect(telefon?.props.medOverskrift).toBe(false);
        expect(telefon?.props.tlfnr).toEqual(personInfo.personalia?.tlfnr);
        expect(Object.keys(telefon?.props ?? {}).sort()).toEqual(["apiUrl", "appUrl", "language", "loginUrl", "medOverskrift", "tlfnr"]);
        expect(telefon?.props.language).toBe("nb");
        expect(telefon?.props.apiUrl).toBe(testKlientConfig.apiUrl);
        expect(telefon?.props.appUrl).toBe(testKlientConfig.appUrl);
        expect(telefon?.props.loginUrl).toBe(testKlientConfig.loginUrl);
    });

    it("viser ikke andre adresser uten adresser fra pdl", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: medAdresser([kontaktFreg], [oppholdFreg]) });

        const html = await render();

        expect(
            oyer(html)
                .map((oy) => oy.url)
                .filter((url) => url.includes("AndreAdresserOy")),
        ).toEqual([]);
    });

    it("sender bare pdl-adressene til adresseøya", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: medAdresser([kontaktFreg, kontaktPdl], [oppholdFreg, oppholdPdl]) });

        const andre = oyer(await render()).find((oy) => oy.url.includes("AndreAdresserOy"));

        expect(andre?.props.adresser).toEqual({ kontaktadresser: [kontaktPdl], oppholdsadresser: [oppholdPdl] });
        expect(andre?.props.adresser).not.toHaveProperty("bostedsadresse");
        expect(Object.keys(andre?.props ?? {}).sort()).toEqual(["adresser", "apiUrl", "appUrl", "language", "loginUrl", "slot"]);
        expect(andre?.props.language).toBe("nb");
        expect(andre?.props.apiUrl).toBe(testKlientConfig.apiUrl);
        expect(andre?.props.appUrl).toBe(testKlientConfig.appUrl);
        expect(andre?.props.loginUrl).toBe(testKlientConfig.loginUrl);
    });

    it("sender bare kontaktadressen når oppholdsadressen ikke er fra pdl", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: medAdresser([kontaktPdl], [oppholdFreg]) });

        const andre = oyer(await render()).find((oy) => oy.url.includes("AndreAdresserOy"));

        expect(andre?.props.adresser).toEqual({ kontaktadresser: [kontaktPdl] });
    });

    it("sender bare oppholdsadressen når kontaktadressen ikke er fra pdl", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: medAdresser([kontaktFreg], [oppholdPdl]) });

        const andre = oyer(await render()).find((oy) => oy.url.includes("AndreAdresserOy"));

        expect(andre?.props.adresser).toEqual({ kontaktadresser: [], oppholdsadresser: [oppholdPdl] });
    });

    it("sender til forsiden for ukjent tjeneste uten å hente data", async () => {
        const response = await renderMedRute(`skjema/noe/${redirectUrl}`);

        expect(response.status).toBe(302);
        expect(response.headers.get("location")).toBe("/person/personopplysninger/nb/");
        expect(hentFraApi).not.toHaveBeenCalled();
    });

    it("sender til forsiden for URL utenfor nav.no uten å hente data", async () => {
        const response = await renderMedRute("skjema/alderspensjon/https%3A%2F%2Fevil.example%2F");

        expect(response.status).toBe(302);
        expect(response.headers.get("location")).toBe("/person/personopplysninger/nb/");
        expect(hentFraApi).not.toHaveBeenCalled();
    });

    it("viser bare feilmelding under banneret når personalia feiler", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "ERROR", error: { code: 500, text: "Feil fra API-et" } });

        const html = await render();

        expect(html).toContain("Gå tilbake til alderspensjon");
        expect(html).toContain("Oisann, noe gikk galt ved henting av data!");
        expect(html).not.toContain("<astro-island");
        expect(html).not.toContain('id="kontaktinformasjon"');
        expect(html).not.toContain('id="utbetaling"');
    });

    it("sender til innlogging når brukeren ikke er logget inn", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "UNAUTHORIZED" });

        const response = await renderMedRute(route);

        expect(response.status).toBe(302);
        expect(response.headers.get("location")).toBe("/login");
        expect(loginUrlFor).toHaveBeenCalledTimes(1);
        const [url, basePath] = vi.mocked(loginUrlFor).mock.calls[0];
        expect(url.pathname).toBe(`/person/personopplysninger/nb/endre-opplysninger/sendt-fra/${route}`);
        expect(basePath).toBe(import.meta.env.BASE_URL);
    });
});
