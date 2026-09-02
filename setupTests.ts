import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { setRuntimeConfig } from "@/runtime-config/runtimeConfig";
import type { RuntimeConfig } from "@/runtime-config/types";

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

/**
 * Component tests render individual components directly (often via
 * `StoreContext.Provider`) without going through the full `ReactApp` island
 * tree / `RuntimeConfigProvider`. Seed a sensible default so `getRuntimeConfig()`
 * (used by `apiClient.ts` etc.) doesn't throw in those tests. Tests that care
 * about specific runtime config values can call `setRuntimeConfig` themselves.
 */
export const testRuntimeConfig: RuntimeConfig = {
    env: "local",
    buildVersion: "test",
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

beforeEach(() => {
    setRuntimeConfig(testRuntimeConfig);
});

afterEach(() => {
    cleanup();
});
