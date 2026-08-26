import * as matchers from "@testing-library/jest-dom/matchers";
import { describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);

expect.extend(matchers);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();
