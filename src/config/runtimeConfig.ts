import { createContext, useContext } from "react";

export type Miljo = "local" | "dev" | "prod";

/**
 * Miljøavhengige verdier for React-øyene. Settes per forespørsel på serveren
 * (se buildRuntimeConfig), siden samme image kjører i alle miljøer.
 */
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

/** Settes i nettleseren av AstroPageRoot før noe leser den. */
export const setRuntimeConfig = (config: RuntimeConfig | null) => {
    current = config;
};

/** For kode utenfor React (API-klient, redirects, Faro), som bare kjører i nettleseren. */
export const getRuntimeConfig = (): RuntimeConfig => {
    if (!current) {
        throw new Error("Runtime-konfigurasjonen er ikke satt");
    }
    return current;
};

export const RuntimeConfigContext = createContext<RuntimeConfig | null>(null);

/**
 * Komponenter leser fra konteksten, slik at serverrendringen bruker verdiene
 * for akkurat denne forespørselen og ikke en global som deles mellom forespørsler.
 */
export const useRuntimeConfig = (): RuntimeConfig => useContext(RuntimeConfigContext) ?? getRuntimeConfig();
