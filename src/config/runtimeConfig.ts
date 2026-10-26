import { createContext, useContext } from "react";

export type Miljo = "local" | "dev" | "prod";

export interface RuntimeConfig {
    environment: Miljo;
    buildVersion: string;
    appUrl: string;
    apiUrl: string;
    dineSakerUrl: string;
    dittNavUrl: string;
    endreKontonummerUrl: string;
    innloggingsstatusUrl: string;
    loginUrl: string;
    pdlUrl: string;
    skjermingUrl: string;
    sykefravaerUrl: string;
    telemetryUrl: string;
    utbetalingsoversiktUrl: string;
}

let current: RuntimeConfig | null = null;

export const setRuntimeConfig = (config: RuntimeConfig | null) => {
    current = config;
};

export const getRuntimeConfig = (): RuntimeConfig => {
    if (!current) {
        throw new Error("Runtime-konfigurasjonen er ikke satt");
    }
    return current;
};

export const RuntimeConfigContext = createContext<RuntimeConfig | null>(null);

export const useRuntimeConfig = (): RuntimeConfig => useContext(RuntimeConfigContext) ?? getRuntimeConfig();
