import { getRuntimeConfig, resetRuntimeConfigForTests, setRuntimeConfig } from "@/runtime-config/runtimeConfig";
import type { RuntimeConfig } from "@/runtime-config/types";

const exampleConfig: RuntimeConfig = {
    env: "local",
    buildVersion: "localbuild",
    appUrl: "http://localhost:3006/person/personopplysninger",
    apiUrl: "/api",
    endreKontonummerUrl: "/api",
    innloggingsstatusUrl: "/api/auth",
    loginUrl: "https://loginservice-q.nav.no/login",
    dineSakerUrl: "https://www.nav.no/dokumentarkiv",
    dittNavUrl: "https://www.nav.no/minside",
    pdlUrl: "https://www.nav.no/person/pdl-fullmakt-ui",
    skjermingUrl: "https://www.nav.no/person/personopplysninger/skjerming",
    sykefravaerUrl: "https://www.ekstern.dev.nav.no/syk/sykefravaer",
    utbetalingsoversiktUrl: "https://www.intern.dev.nav.no/utbetalingsoversikt",
    telemetryUrl: "http://localhost:12347/collect",
};

describe("runtimeConfig", () => {
    beforeEach(() => {
        resetRuntimeConfigForTests();
    });

    it("should throw when read before it has been set", () => {
        expect(() => getRuntimeConfig()).toThrow(/not initialized/);
    });

    it("should return the exact config that was set", () => {
        setRuntimeConfig(exampleConfig);
        expect(getRuntimeConfig()).toEqual(exampleConfig);
    });

    it("should return the latest config when set multiple times", () => {
        setRuntimeConfig(exampleConfig);
        setRuntimeConfig({ ...exampleConfig, env: "prod" });

        expect(getRuntimeConfig().env).toBe("prod");
    });
});
