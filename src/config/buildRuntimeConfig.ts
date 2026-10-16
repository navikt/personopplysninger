import type { Miljo, RuntimeConfig } from "./runtimeConfig";

export interface RuntimeEnv {
    /** Opprinnelse som brukes når vertsnavnet i forespørselen ikke er et nav.no-domene. */
    APP_ORIGIN: string;
    API_PATH: string;
    BUILD_VERSION: string;
    DINE_SAKER_URL: string;
    DITT_NAV_URL: string;
    ENDRE_KONTONUMMER_URL: string;
    INNLOGGINGSSTATUS_URL: string;
    LOGIN_URL: string;
    PDL_URL: string;
    SKJERMING_URL: string;
    SYKEFRAVAER_URL: string;
    TELEMETRY_URL: string;
    UTBETALINGSOVERSIKT_URL: string;
}

interface Input {
    requestUrl: URL;
    basePath: string;
    clusterName?: string;
    env: RuntimeEnv;
}

const navnoHost = /^(?:[a-z0-9-]+\.)*nav\.no$/i;

const miljoFraCluster = (clusterName?: string): Miljo => {
    if (clusterName === "prod-gcp") return "prod";
    if (clusterName === "dev-gcp") return "dev";
    return "local";
};

// Samme app svarer på flere ingresser (offentlig og intern), så app- og API-URL
// følger vertsnavnet brukeren kom inn på. TLS termineres før appen, derfor https.
const resolveOrigin = (requestUrl: URL, environment: Miljo, fallback: string) => {
    if (environment === "local") {
        return requestUrl.origin;
    }
    return navnoHost.test(requestUrl.hostname) && !requestUrl.port ? `https://${requestUrl.hostname}` : fallback;
};

export const buildRuntimeConfig = ({ requestUrl, basePath, clusterName, env }: Input): RuntimeConfig => {
    const environment = miljoFraCluster(clusterName);
    const origin = resolveOrigin(requestUrl, environment, env.APP_ORIGIN);

    return {
        environment,
        buildVersion: env.BUILD_VERSION,
        appUrl: `${origin}${basePath.replace(/\/$/, "")}`,
        apiUrl: `${origin}${env.API_PATH}`,
        dineSakerUrl: env.DINE_SAKER_URL,
        dittNavUrl: env.DITT_NAV_URL,
        endreKontonummerUrl: env.ENDRE_KONTONUMMER_URL,
        innloggingsstatusUrl: env.INNLOGGINGSSTATUS_URL,
        loginUrl: env.LOGIN_URL,
        pdlUrl: env.PDL_URL,
        skjermingUrl: env.SKJERMING_URL,
        sykefravaerUrl: env.SYKEFRAVAER_URL,
        telemetryUrl: env.TELEMETRY_URL,
        utbetalingsoversiktUrl: env.UTBETALINGSOVERSIKT_URL,
    };
};
