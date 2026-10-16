// Typer for tsc utenfor Astro; astro check bruker de genererte typene i .astro/.
declare module "astro:env/server" {
    export const API_PATH: string;
    export const APP_ORIGIN: string;
    export const BUILD_VERSION: string;
    export const DINE_SAKER_URL: string;
    export const DITT_NAV_URL: string;
    export const ENDRE_KONTONUMMER_URL: string;
    export const INNLOGGINGSSTATUS_URL: string;
    export const LOGIN_URL: string;
    export const PDL_URL: string;
    export const SKJERMING_URL: string;
    export const SYKEFRAVAER_URL: string;
    export const TELEMETRY_URL: string;
    export const UTBETALINGSOVERSIKT_URL: string;
}
