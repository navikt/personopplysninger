// @vitest-environment node
import { getApiUrl, getAppUrl, getMiljo } from "@/utils/environment";

vi.mock("astro:env/server", () => ({ APP_ORIGIN: "https://www.nav.no", API_PATH: "/tms-personopplysninger-api" }));

const prod = (url: string) => {
    vi.stubEnv("NAIS_CLUSTER_NAME", "prod-gcp");
    return new URL(url);
};

describe("environment", () => {
    beforeEach(() => vi.stubEnv("BASE_URL", "/person/personopplysninger/"));
    afterEach(() => vi.unstubAllEnvs());

    it.each([
        ["prod-gcp", "prod"],
        ["dev-gcp", "dev"],
        [undefined, "local"],
        ["noe-annet", "local"],
    ])("utleder miljø %s som %s", (clusterName, miljo) => {
        vi.stubEnv("NAIS_CLUSTER_NAME", clusterName);

        expect(getMiljo()).toBe(miljo);
    });

    it("utleder app- og API-URL fra vertsnavnet i forespørselen", () => {
        const url = prod("http://www.intern.nav.no/person/personopplysninger/nb/");

        expect(getAppUrl(url)).toBe("https://www.intern.nav.no/person/personopplysninger");
        expect(getApiUrl(url)).toBe("https://www.intern.nav.no/tms-personopplysninger-api");
    });

    it("bruker https for nav.no-verter selv om forespørselen kom inn over http bak ingressen", () => {
        expect(getAppUrl(prod("http://www.nav.no/person/personopplysninger/nb/"))).toBe("https://www.nav.no/person/personopplysninger");
    });

    it.each([
        "http://evil.example/person/personopplysninger/",
        "http://nav.no.evil.example/",
        "http://evilnav.no/",
        "http://localhost:3000/",
        "http://10.0.0.1:3000/",
        "http://www.intern.nav.no:8080/",
    ])("faller tilbake til APP_ORIGIN for verter utenfor nav.no i dev og prod (%s)", (url) => {
        const requestUrl = prod(url);

        expect(getAppUrl(requestUrl)).toBe("https://www.nav.no/person/personopplysninger");
        expect(getApiUrl(requestUrl)).toBe("https://www.nav.no/tms-personopplysninger-api");
    });

    it("godtar nav.no uten www", () => {
        expect(getAppUrl(prod("https://nav.no/person/personopplysninger/"))).toBe("https://nav.no/person/personopplysninger");
    });

    it("beholder opprinnelsen med port lokalt", () => {
        const url = new URL("http://localhost:4321/person/personopplysninger/nb/");

        expect(getAppUrl(url)).toBe("http://localhost:4321/person/personopplysninger");
        expect(getApiUrl(url)).toBe("http://localhost:4321/tms-personopplysninger-api");
    });

    it("gir bare opprinnelsen når BASE_URL er /", () => {
        vi.stubEnv("BASE_URL", "/");

        expect(getAppUrl(prod("https://www.nav.no/"))).toBe("https://www.nav.no");
    });
});
