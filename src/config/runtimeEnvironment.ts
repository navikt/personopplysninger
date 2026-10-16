const environment = import.meta.env.PUBLIC_ENV;

export const runtimeEnvironment = {
    environment,
    buildVersion: import.meta.env.PUBLIC_BUILD_VERSION ?? "",
    apiUrl: import.meta.env.PUBLIC_API_URL ?? "",
    appUrl: import.meta.env.PUBLIC_APP_URL ?? "",
    dineSakerUrl: import.meta.env.PUBLIC_DINE_SAKER_URL ?? "",
    dittNavUrl: import.meta.env.PUBLIC_DITT_NAV_URL ?? "",
    endreKontonummerUrl: import.meta.env.PUBLIC_ENDRE_KONTONUMMER_URL ?? "",
    innloggingsstatusUrl: import.meta.env.PUBLIC_INNLOGGINGSSTATUS_URL ?? "",
    loginUrl: import.meta.env.PUBLIC_LOGIN_URL ?? "",
    pdlUrl: import.meta.env.PUBLIC_PDL_URL ?? "",
    skjermingUrl: import.meta.env.PUBLIC_SKJERMING_URL ?? "",
    sykefravaerUrl: import.meta.env.PUBLIC_SYKEFRAVAER_URL ?? "",
    telemetryUrl: import.meta.env.PUBLIC_TELEMETRY_URL ?? "",
    utbetalingsoversiktUrl: import.meta.env.PUBLIC_UTBETALINGSOVERSIKT_URL ?? "",
};
