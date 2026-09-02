import {
    API_URL,
    APP_ENV,
    APP_URL,
    BUILD_VERSION,
    DINE_SAKER_URL,
    DITT_NAV_URL,
    ENDRE_KONTONUMMER_URL,
    INNLOGGINGSSTATUS_URL,
    LOGIN_URL,
    PDL_URL,
    SKJERMING_URL,
    SYKEFRAVAER_URL,
    TELEMETRY_URL,
    UTBETALINGSOVERSIKT_URL,
} from "astro:env/server";
import type { RuntimeConfig } from "@/runtime-config/types";

export const isLocal = APP_ENV === "local";
export const isProduction = APP_ENV === "prod";

/** Which decorator environment (nav-dekoratoren-moduler) to fetch fragments from. */
export const getDecoratorEnvironment = (): "dev" | "prod" => (isProduction ? "prod" : "dev");

/**
 * Builds the single serializable runtime configuration object passed from the
 * Astro server into the `client:only="react"` compatibility island. Reading
 * these values here (server-side, at request time) rather than compiling them
 * into the client bundle is what lets one built image serve both the public
 * and internal Nais Applications.
 */
export const getRuntimeConfig = (): RuntimeConfig => ({
    env: APP_ENV,
    buildVersion: BUILD_VERSION,
    appUrl: APP_URL,
    apiUrl: API_URL,
    endreKontonummerUrl: ENDRE_KONTONUMMER_URL,
    innloggingsstatusUrl: INNLOGGINGSSTATUS_URL,
    loginUrl: LOGIN_URL,
    dineSakerUrl: DINE_SAKER_URL,
    dittNavUrl: DITT_NAV_URL,
    pdlUrl: PDL_URL,
    skjermingUrl: SKJERMING_URL,
    sykefravaerUrl: SYKEFRAVAER_URL,
    utbetalingsoversiktUrl: UTBETALINGSOVERSIKT_URL,
    telemetryUrl: TELEMETRY_URL,
});
