import type { RuntimeConfig } from "@/config/runtimeConfig";

export const testRuntimeConfig: RuntimeConfig = {
    environment: "local",
    buildVersion: "test",
    appUrl: "http://localhost:4321/person/personopplysninger",
    apiUrl: "http://localhost:4321/api",
    dineSakerUrl: "https://www.intern.dev.nav.no/dokumentarkiv",
    dittNavUrl: "https://www.intern.dev.nav.no/minside",
    endreKontonummerUrl: "http://localhost:4321/api",
    loginUrl: "http://localhost:4321/oauth2/login",
    pdlUrl: "https://www.intern.dev.nav.no/person/pdl-fullmakt-ui",
    skjermingUrl: "https://skjerming-ui.intern.dev.nav.no/person/personopplysninger/skjerming",
    sykefravaerUrl: "https://www.ekstern.dev.nav.no/syk/sykefravaer",
    telemetryUrl: "https://telemetry.ekstern.dev.nav.no/collect",
    utbetalingsoversiktUrl: "https://www.intern.dev.nav.no/utbetalingsoversikt/",
};

export const testKlientConfig = {
    apiUrl: testRuntimeConfig.apiUrl,
    appUrl: testRuntimeConfig.appUrl,
    loginUrl: testRuntimeConfig.loginUrl,
    endreKontonummerUrl: testRuntimeConfig.endreKontonummerUrl,
};
