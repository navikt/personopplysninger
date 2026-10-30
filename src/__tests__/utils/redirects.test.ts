import { setKlientConfig } from "@/config/klientConfig";
import { getLoginRedirectUrl, redirects, resolveLoginReturnPath, validateAndDecodeRedirectUrl } from "@/utils/redirects";
import { testKlientConfig } from "./testRuntimeConfig";

const basePath = "/person/personopplysninger";
const encode = (path: string) => btoa(path);

describe("resolveLoginReturnPath", () => {
    it("returnerer stien brukeren kom fra", () => {
        expect(resolveLoginReturnPath(encode(`${basePath}/nb/arbeidsforhold/abc`), basePath)).toBe(`${basePath}/nb/arbeidsforhold/abc`);
    });

    it("beholder hash og søk", () => {
        expect(resolveLoginReturnPath(encode(`${basePath}/nb/dsop?a=1#seksjon`), basePath)).toBe(`${basePath}/nb/dsop?a=1#seksjon`);
    });

    it("gir null uten parameter eller med ugyldig base64", () => {
        expect(resolveLoginReturnPath(null, basePath)).toBeNull();
        expect(resolveLoginReturnPath("%%%", basePath)).toBeNull();
    });

    it("avviser stier utenfor basestien", () => {
        expect(resolveLoginReturnPath(encode("/andre/sider"), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}x/nb`), basePath)).toBeNull();
    });

    it("avviser eksterne og protokollrelative URL-er (open redirect)", () => {
        expect(resolveLoginReturnPath(encode("https://evil.example/"), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode("//evil.example/"), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}//evil.example/`), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}/\\evil.example/`), basePath)).toBeNull();
        expect(resolveLoginReturnPath(encode(`${basePath}/../../evil`), basePath)).toBeNull();
    });
});

describe("getLoginRedirectUrl", () => {
    it("URL-koder base64-verdien slik at + og / overlever søkestrengen", () => {
        window.history.pushState({}, "", `${basePath}/nb/~~~`);
        const url = getLoginRedirectUrl();
        const param = new URL(url, "http://localhost").searchParams.get("path");

        expect(param).not.toBeNull();
        expect(atob(param as string)).toBe(window.location.pathname + window.location.hash);
        expect(url).toContain("%2B");
    });

    it("sender brukeren tilbake til appens URL for vertsnavnet de kom inn på", () => {
        setKlientConfig({ ...testKlientConfig, appUrl: "https://www.intern.nav.no/person/personopplysninger" });

        expect(getLoginRedirectUrl()).toMatch(/^https:\/\/www\.intern\.nav\.no\/person\/personopplysninger\?path=/);

        setKlientConfig(testKlientConfig);
    });
});

describe("validateAndDecodeRedirectUrl", () => {
    it("dekoder nav.no-URL med subdomene og fjerner hash", () => {
        expect(validateAndDecodeRedirectUrl("https%3A%2F%2Fwww.nav.no%2Fpselv%2Ftransaksjon%2Fminprofil.jsf%23del")).toBe(
            "https://www.nav.no/pselv/transaksjon/minprofil.jsf",
        );
    });

    it("avviser http", () => {
        expect(validateAndDecodeRedirectUrl("http%3A%2F%2Fwww.nav.no%2F")).toBeNull();
    });

    it("avviser domener som bare inneholder nav.no", () => {
        expect(validateAndDecodeRedirectUrl("https%3A%2F%2Fnav.no.evil.com%2F")).toBeNull();
    });

    it("avviser søppel og manglende verdi", () => {
        expect(validateAndDecodeRedirectUrl("%%%")).toBeNull();
        expect(validateAndDecodeRedirectUrl("ikke-en-url")).toBeNull();
        expect(validateAndDecodeRedirectUrl(undefined)).toBeNull();
    });
});

describe("redirects", () => {
    it.each(["skjema/alderspensjonssoknad", "skjema/alderspensjon"])("%s deler beskrivelsen i tekst før, uthevet og etter", (tjeneste) => {
        const { beskrivelseFoer, beskrivelseUthevet, beskrivelseEtter, knapp } = redirects[tjeneste];

        expect(beskrivelseFoer).toBe("Du har blitt sendt fra alderspensjon. Her kan du legge til eller endre ");
        expect(beskrivelseUthevet).toBe("kontaktinformasjon og kontonummer");
        expect(beskrivelseEtter).toBe(".");
        expect(knapp).toBe("Gå tilbake til alderspensjon");
    });
});
