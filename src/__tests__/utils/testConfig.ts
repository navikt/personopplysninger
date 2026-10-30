export const testEnv = {
    API_PATH: "/api",
    BUILD_VERSION: "test",
    DINE_SAKER_URL: "https://www.intern.dev.nav.no/dokumentarkiv",
    DITT_NAV_URL: "https://www.intern.dev.nav.no/minside",
    ENDRE_KONTONUMMER_URL: "http://localhost:4321/endre-kontonummer-api",
    LOGIN_URL: "http://localhost:4321/oauth2/login",
    PDL_URL: "https://www.intern.dev.nav.no/person/pdl-fullmakt-ui",
    SKJERMING_URL: "https://skjerming-ui.intern.dev.nav.no/person/personopplysninger/skjerming",
    SYKEFRAVAER_URL: "https://www.ekstern.dev.nav.no/syk/sykefravaer",
    TELEMETRY_URL: "https://telemetry.ekstern.dev.nav.no/collect",
    UTBETALINGSOVERSIKT_URL: "https://www.intern.dev.nav.no/utbetalingsoversikt/",
};

export const testKlientConfig = {
    apiUrl: "http://localhost:4321/api",
    appUrl: "http://localhost:4321/person/personopplysninger",
    loginUrl: testEnv.LOGIN_URL,
    endreKontonummerUrl: testEnv.ENDRE_KONTONUMMER_URL,
};
