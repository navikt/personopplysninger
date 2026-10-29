import { loadRenderers } from "astro:container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, vi } from "vitest";
import kontaktInfo from "@/mocks/fixtures/kontakt-info.json";
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

type Svar = Awaited<ReturnType<typeof hentFraApi>>;

const svar = (kontaktinformasjon: Svar) => (path: string) =>
    Promise.resolve<Svar>(path === "/kontaktinformasjon" ? kontaktinformasjon : { status: "RESULT", data: personInfo });

const utenTelefon = { ...personInfo, personalia: { ...personInfo.personalia, tlfnr: {} } };

const kontaktBoks = (html: string) => html.slice(html.indexOf('id="kontaktinformasjon"'), html.indexOf('id="utbetaling"'));

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

    it("viser kontaktinformasjon fra registeret", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar({ status: "RESULT", data: kontaktInfo }));

        const boks = kontaktBoks(await render());

        expect(boks).toContain("12131415");
        expect(boks).toContain("test@test.com");
        expect(boks).toContain("Du mottar post og informasjon fra det offentlige elektronisk.");
        expect(boks).toContain("https://minprofil.kontaktregisteret.no");
    });

    it("viser registeret etter telefonlisten når det finnes et nummer", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar({ status: "RESULT", data: kontaktInfo }));

        const boks = kontaktBoks(await render());

        expect(boks.indexOf("Telefonnummer registrert hos Nav")).toBeLessThan(boks.indexOf("Opplysninger fra Kontakt - og reservasjonsregisteret"));
    });

    it("viser registeret først når det ikke finnes et nummer", async () => {
        vi.mocked(hentFraApi).mockImplementation((path: string) =>
            Promise.resolve<Svar>({ status: "RESULT", data: path === "/kontaktinformasjon" ? kontaktInfo : utenTelefon }),
        );

        const boks = kontaktBoks(await render());

        expect(boks).not.toContain("Opplysninger fra Kontakt - og reservasjonsregisteret");
        expect(boks.indexOf("12131415")).toBeLessThan(boks.indexOf("<astro-island"));
    });

    it("sender bare telefonnumrene til telefonøya", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar({ status: "RESULT", data: kontaktInfo }));

        const html = await render();
        const oy = html.slice(html.indexOf("<astro-island"), html.indexOf("</astro-island>"));

        expect(oy).toContain("40853158");
        expect(oy).not.toContain("10108000398");
        expect(oy).not.toContain("12345678911");
        expect(oy).not.toContain("test@test.com");
    });

    it("viser feilen fra registeret bare i kontaktinformasjon-boksen", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar(feil));

        const html = await render();

        expect(kontaktBoks(html)).toContain("Oisann, noe gikk galt ved henting av data!");
        expect(html).toContain("Hei Vinayagum-mask Amizic!");
        expect(html.slice(0, html.indexOf('id="kontaktinformasjon"'))).not.toContain("Oisann");
    });
    it("viser adressene fra Folkeregisteret og øvrige adresser i en øy", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar({ status: "RESULT", data: kontaktInfo }));

        const html = await render();
        const boks = html.slice(html.indexOf('id="adresser"'), html.indexOf('id="utbetaling"')).replaceAll("<!-- -->", "");
        const oy = html.slice(
            html.lastIndexOf("<astro-island", html.indexOf("Øvrige registrerte adresser")),
            html.indexOf("</astro-island>", html.indexOf("Øvrige registrerte adresser")),
        );

        expect(boks).toContain("Adresser som er registert i Folkeregisteret");
        expect(boks).toContain("JØRGENSENVEIEN 14 B");
        expect(boks).toContain("<details");
        expect(oy).toContain("Øvrige registrerte adresser");
        expect(oy).toContain("Postboks 10 Sørstrand");
    });

    it("sender bare de øvrige adressene til adresseøya", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar({ status: "RESULT", data: kontaktInfo }));

        const html = await render();
        const start = html.lastIndexOf("<astro-island", html.indexOf("Øvrige registrerte adresser"));
        const oy = html.slice(start, html.indexOf("</astro-island>", start));
        const props = oy.slice(0, oy.indexOf(">"));

        expect(props).toContain("Sørstrand");
        expect(props).not.toContain("10108000398");
        expect(props).not.toContain("12345678911");
        expect(props).not.toContain("JØRGENSENVEIEN");
        expect(props).not.toContain("test@test.com");
    });

    it("viser ingen adresseøy når det ikke finnes øvrige adresser", async () => {
        const utenPdl = { ...personInfo, adresser: { ...personInfo.adresser, kontaktadresser: [] } };
        vi.mocked(hentFraApi).mockImplementation((path: string) =>
            Promise.resolve<Svar>({ status: "RESULT", data: path === "/kontaktinformasjon" ? kontaktInfo : utenPdl }),
        );

        const html = await render();

        expect(html).toContain('id="adresser"');
        expect(html).not.toContain("Øvrige registrerte adresser");
    });

    it("viser Ditt Nav-kontor med fanene i en øy", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar({ status: "RESULT", data: kontaktInfo }));

        const html = await render();
        const boks = html.slice(html.indexOf('id="ditt-nav-kontor"')).replaceAll("<!-- -->", "");

        expect(boks).toContain("Ditt kontor er ");
        expect(boks).toContain("Nav Halden-Aremark");
        expect(boks).toContain('role="tablist"');
        expect(boks).toContain('href="/person/kontakt-oss/nb/"');
        expect(boks).toContain("Kilde: Nav");
    });

    it("sender bare publikumsmottakene til Nav-kontoret-øya", async () => {
        vi.mocked(hentFraApi).mockImplementation(svar({ status: "RESULT", data: kontaktInfo }));

        const html = await render();
        const start = html.lastIndexOf("<astro-island", html.indexOf('role="tablist"'));
        const props = html.slice(start, html.indexOf(">", start));

        expect(props).toContain("Aremarkveien");
        expect(props).not.toContain("10108000398");
        expect(props).not.toContain("12345678911");
        expect(props).not.toContain("AMIZIC");
        expect(props).not.toContain("55553333");
    });

    it("viser ikke Ditt Nav-kontor uten publikumsmottak", async () => {
        const utenMottak = { ...personInfo, enhetKontaktInformasjon: { ...personInfo.enhetKontaktInformasjon, brukerkontakt: {} } };
        vi.mocked(hentFraApi).mockImplementation((path: string) =>
            Promise.resolve<Svar>({ status: "RESULT", data: path === "/kontaktinformasjon" ? kontaktInfo : utenMottak }),
        );

        const html = await render();

        expect(html).not.toContain('id="ditt-nav-kontor"');
    });

    it("viser arbeidsforhold-boksen med disclaimer, kilde og spinneren fra øya", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: personInfo });

        const html = await render();
        const boks = html.slice(html.indexOf('id="arbeidsforhold"')).replaceAll("<!-- -->", "");
        const start = boks.indexOf("<astro-island");
        const oy = boks.slice(start, boks.indexOf("</astro-island>", start));

        expect(boks).toContain("Oversikten viser alle arbeidsforhold rapportert etter 01.01.2015.");
        expect(boks).toContain("Kilde: Arbeidsgiver- og arbeidstakerregisteret");
        expect(boks).toContain("Dataene er rapportert av arbeidsgiver");
        expect(oy).toContain("Laster innhold...");
    });

    it("sender bare navn og fødselsnummer til arbeidsforhold-øya", async () => {
        vi.mocked(hentFraApi).mockResolvedValue({ status: "RESULT", data: personInfo });

        const html = await render();
        const boks = html.slice(html.indexOf('id="arbeidsforhold"'));
        const start = boks.indexOf("<astro-island");
        const props = boks.slice(start, boks.indexOf(">", start));

        expect(props).toContain("VINAYAGUM-MASK");
        expect(props).not.toContain("12345678911");
        expect(props).not.toContain("40853158");
        expect(props).not.toContain("JØRGENSENVEIEN");
    });

    it("viser arbeidsforhold-boksen også når /personalia feiler", async () => {
        vi.mocked(hentFraApi).mockResolvedValue(feil);

        const html = await render();

        expect(html).toContain('id="arbeidsforhold"');
    });
});
