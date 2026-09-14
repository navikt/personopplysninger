const environment = import.meta.env.PUBLIC_ENV ?? import.meta.env.VITE_ENV;

export const runtimeEnvironment = {
    environment,
    apiUrl: import.meta.env.PUBLIC_API_URL ?? import.meta.env.VITE_API_URL ?? "",
    appUrl: import.meta.env.PUBLIC_APP_URL ?? import.meta.env.VITE_APP_URL ?? "",
    dineSakerUrl: import.meta.env.PUBLIC_DINE_SAKER_URL ?? import.meta.env.VITE_DINE_SAKER_URL ?? "",
    dittNavUrl: import.meta.env.PUBLIC_DITT_NAV_URL ?? import.meta.env.VITE_DITT_NAV_URL ?? "",
    endreKontonummerUrl: import.meta.env.PUBLIC_ENDRE_KONTONUMMER_URL ?? import.meta.env.VITE_ENDRE_KONTONUMMER_URL ?? "",
    innloggingsstatusUrl: import.meta.env.PUBLIC_INNLOGGINGSSTATUS_URL ?? import.meta.env.VITE_INNLOGGINGSSTATUS_URL ?? "",
    loginUrl: import.meta.env.PUBLIC_LOGIN_URL ?? import.meta.env.VITE_LOGIN_URL ?? "",
    pdlUrl: import.meta.env.PUBLIC_PDL_URL ?? import.meta.env.VITE_PDL_URL ?? "",
    skjermingUrl: import.meta.env.PUBLIC_SKJERMING_URL ?? import.meta.env.VITE_SKJERMING_URL ?? "",
    sykefravaerUrl: import.meta.env.PUBLIC_SYKEFRAVAER_URL ?? import.meta.env.VITE_SYKEFRAVAER_URL ?? "",
    utbetalingsoversiktUrl: import.meta.env.PUBLIC_UTBETALINGSOVERSIKT_URL ?? import.meta.env.VITE_UTBETALINGSOVERSIKT_URL ?? "",
};
