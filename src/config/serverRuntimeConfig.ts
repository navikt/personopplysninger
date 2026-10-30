import {
    API_PATH,
    APP_ORIGIN,
    BUILD_VERSION,
    DINE_SAKER_URL,
    DITT_NAV_URL,
    ENDRE_KONTONUMMER_URL,
    LOGIN_URL,
    PDL_URL,
    SKJERMING_URL,
    SYKEFRAVAER_URL,
    TELEMETRY_URL,
    UTBETALINGSOVERSIKT_URL,
} from "astro:env/server";
import { buildRuntimeConfig } from "./buildRuntimeConfig";

export const getServerRuntimeConfig = (requestUrl: URL) =>
    buildRuntimeConfig({
        requestUrl,
        basePath: import.meta.env.BASE_URL,
        clusterName: process.env.NAIS_CLUSTER_NAME,
        env: {
            API_PATH,
            APP_ORIGIN,
            BUILD_VERSION,
            DINE_SAKER_URL,
            DITT_NAV_URL,
            ENDRE_KONTONUMMER_URL,
            LOGIN_URL,
            PDL_URL,
            SKJERMING_URL,
            SYKEFRAVAER_URL,
            TELEMETRY_URL,
            UTBETALINGSOVERSIKT_URL,
        },
    });
