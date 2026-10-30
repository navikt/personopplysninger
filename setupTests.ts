import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { testRuntimeConfig } from "@/__tests__/utils/testRuntimeConfig";
import { setRuntimeConfig } from "@/config/runtimeConfig";

const fetchMocker = createFetchMock(vi);

expect.extend(matchers);

fetchMocker.enableMocks();

setRuntimeConfig(testRuntimeConfig);
