import { buildRuntimeConfig, type RuntimeEnv } from "@/config/buildRuntimeConfig";

const env: RuntimeEnv = {
    APP_ORIGIN: "https://www.nav.no",
    API_PATH: "/tms-personopplysninger-api",
    BUILD_VERSION: "abc123",
    DINE_SAKER_URL: "https://www.nav.no/dokumentarkiv",
    DITT_NAV_URL: "https://www.nav.no/minside",
    ENDRE_KONTONUMMER_URL: "https://www.nav.no/tms-endre-kontonummer",
    LOGIN_URL: "https://login.nav.no/oauth2/login",
    PDL_URL: "https://www.nav.no/person/pdl-fullmakt-ui",
    SKJERMING_URL: "https://www.nav.no/person/personopplysninger/skjerming",
    SYKEFRAVAER_URL: "https://www.nav.no/syk/sykefravaer",
    TELEMETRY_URL: "https://telemetry.nav.no/collect",
    UTBETALINGSOVERSIKT_URL: "https://tjenester.nav.no/utbetalingsoversikt",
};

const basePath = "/person/personopplysninger";

const build = (url: string, clusterName?: string) => buildRuntimeConfig({ requestUrl: new URL(url), basePath, clusterName, env });

describe("buildRuntimeConfig", () => {
    it.each([
        ["prod-gcp", "prod"],
        ["dev-gcp", "dev"],
        [undefined, "local"],
        ["noe-annet", "local"],
    ])("utleder miljø %s som %s", (clusterName, environment) => {
        expect(build("https://www.nav.no/person/personopplysninger/nb/", clusterName).environment).toBe(environment);
    });

    it("utleder app- og API-URL fra vertsnavnet i forespørselen", () => {
        const config = build("http://www.intern.nav.no/person/personopplysninger/nb/", "prod-gcp");

        expect(config.appUrl).toBe("https://www.intern.nav.no/person/personopplysninger");
        expect(config.apiUrl).toBe("https://www.intern.nav.no/tms-personopplysninger-api");
    });

    it("bruker https for nav.no-verter selv om forespørselen kom inn over http bak ingressen", () => {
        expect(build("http://www.nav.no/person/personopplysninger/nb/", "prod-gcp").appUrl).toBe("https://www.nav.no/person/personopplysninger");
    });

    it.each([
        "http://evil.example/person/personopplysninger/",
        "http://nav.no.evil.example/",
        "http://localhost:3000/",
        "http://10.0.0.1:3000/",
        "http://www.intern.nav.no:8080/",
    ])("faller tilbake til APP_ORIGIN for verter utenfor nav.no i dev og prod (%s)", (url) => {
        const config = build(url, "prod-gcp");

        expect(config.appUrl).toBe("https://www.nav.no/person/personopplysninger");
        expect(config.apiUrl).toBe("https://www.nav.no/tms-personopplysninger-api");
    });

    it("godtar nav.no uten www", () => {
        expect(build("https://nav.no/person/personopplysninger/", "prod-gcp").appUrl).toBe("https://nav.no/person/personopplysninger");
    });

    it("beholder opprinnelsen med port lokalt", () => {
        const config = build("http://localhost:4321/person/personopplysninger/nb/");

        expect(config.appUrl).toBe("http://localhost:4321/person/personopplysninger");
        expect(config.apiUrl).toBe("http://localhost:4321/tms-personopplysninger-api");
    });

    it("sender miljøverdiene videre uendret", () => {
        const config = build("https://www.nav.no/", "prod-gcp");

        expect(config).not.toHaveProperty("innloggingsstatusUrl");
        expect(config).toMatchObject({
            buildVersion: "abc123",
            dineSakerUrl: env.DINE_SAKER_URL,
            dittNavUrl: env.DITT_NAV_URL,
            endreKontonummerUrl: env.ENDRE_KONTONUMMER_URL,
            loginUrl: env.LOGIN_URL,
            pdlUrl: env.PDL_URL,
            skjermingUrl: env.SKJERMING_URL,
            sykefravaerUrl: env.SYKEFRAVAER_URL,
            telemetryUrl: env.TELEMETRY_URL,
            utbetalingsoversiktUrl: env.UTBETALINGSOVERSIKT_URL,
        });
    });
});
