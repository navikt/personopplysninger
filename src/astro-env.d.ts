declare module "astro:env/client" {
    export const PUBLIC_ENV: "local" | "dev" | "prod";
    export const PUBLIC_BUILD_VERSION: string;
    export const PUBLIC_DINE_SAKER_URL: string;
    export const PUBLIC_PDL_URL: string;
    export const PUBLIC_SKJERMING_URL: string;
    export const PUBLIC_APP_URL: string;
    export const PUBLIC_API_URL: string;
    export const PUBLIC_ENDRE_KONTONUMMER_URL: string;
    export const PUBLIC_UTBETALINGSOVERSIKT_URL: string;
    export const PUBLIC_SYKEFRAVAER_URL: string;
    export const PUBLIC_LOGIN_URL: string;
    export const PUBLIC_DITT_NAV_URL: string;
    export const PUBLIC_PENSJONSOPPTJENING_URL: string;
    export const PUBLIC_INNLOGGINGSSTATUS_URL: string;
    export const PUBLIC_TELEMETRY_URL: string;
}
