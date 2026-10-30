import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { testKlientConfig } from "@/__tests__/utils/testConfig";
import { setKlientConfig } from "@/utils/klientConfig";

const fetchMocker = createFetchMock(vi);

expect.extend(matchers);

fetchMocker.enableMocks();

setKlientConfig(testKlientConfig);
