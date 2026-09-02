/**
 * Runtime configuration shared between the Astro server and the React
 * compatibility island. Values are resolved server-side (see
 * `src/server/environment.ts`) from `astro:env/server` and passed as a
 * plain, serializable object into the `client:only="react"` island, so a
 * single built image can serve both the public (personbruker) and internal
 * (min-side) Nais Applications with different values per deploy.
 */
export type AppEnvironment = "local" | "dev" | "prod";

export interface RuntimeConfig {
    env: AppEnvironment;
    buildVersion: string;
    appUrl: string;
    apiUrl: string;
    endreKontonummerUrl: string;
    innloggingsstatusUrl: string;
    loginUrl: string;
    dineSakerUrl: string;
    dittNavUrl: string;
    pdlUrl: string;
    skjermingUrl: string;
    sykefravaerUrl: string;
    utbetalingsoversiktUrl: string;
    telemetryUrl: string;
}
