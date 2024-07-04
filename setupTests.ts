import * as matchers from '@testing-library/jest-dom/matchers';
import createFetchMock from 'vitest-fetch-mock';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { expect, describe, it, vi } from 'vitest';

const fetchMocker = createFetchMock(vi);

expect.extend(matchers);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();
