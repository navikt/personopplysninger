export type Miljo = "local" | "dev" | "prod";

export interface RuntimeConfig {
    environment: Miljo;
    buildVersion: string;
    appUrl: string;
    apiUrl: string;
    dineSakerUrl: string;
    dittNavUrl: string;
    endreKontonummerUrl: string;
    loginUrl: string;
    pdlUrl: string;
    skjermingUrl: string;
    sykefravaerUrl: string;
    telemetryUrl: string;
    utbetalingsoversiktUrl: string;
}
