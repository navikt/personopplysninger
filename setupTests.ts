import * as matchers from "@testing-library/jest-dom/matchers";
import { describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { testRuntimeConfig } from "@/__tests__/utils/testRuntimeConfig";
import { setRuntimeConfig } from "@/config/runtimeConfig";

// Dekoratørens klient venter på dekoratøren med en timer som aldri stopper i testene,
// og som kan gå etter at jsdom er revet ned.
vi.mock("@navikt/nav-dekoratoren-moduler", () => ({
    onBreadcrumbClick: vi.fn(),
    onLanguageSelect: vi.fn(),
    setAvailableLanguages: vi.fn(),
    setBreadcrumbs: vi.fn(),
}));

const fetchMocker = createFetchMock(vi);

expect.extend(matchers);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

// Øyene får konfigurasjonen fra serveren; i testene settes en lokal variant globalt.
setRuntimeConfig(testRuntimeConfig);
