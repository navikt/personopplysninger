import * as matchers from "@testing-library/jest-dom/matchers";
import { describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { testRuntimeConfig } from "@/__tests__/utils/testRuntimeConfig";
import { setRuntimeConfig } from "@/config/runtimeConfig";

const fetchMocker = createFetchMock(vi);

expect.extend(matchers);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

// Øyene får konfigurasjonen fra serveren; i testene settes en lokal variant globalt.
setRuntimeConfig(testRuntimeConfig);
