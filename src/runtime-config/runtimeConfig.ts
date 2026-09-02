import type { RuntimeConfig } from "./types";

/**
 * Module-level singleton used by plain (non-component) client modules such as
 * `apiClient.ts` and `redirects.ts`, which run outside of the React tree and
 * therefore cannot use the `useRuntimeConfig` hook. `RuntimeConfigProvider`
 * calls `setRuntimeConfig` once, synchronously, before the React island tree
 * renders for the first time.
 */
let runtimeConfig: RuntimeConfig | undefined;

export const setRuntimeConfig = (config: RuntimeConfig): void => {
    runtimeConfig = config;
};

export const getRuntimeConfig = (): RuntimeConfig => {
    if (!runtimeConfig) {
        throw new Error("Runtime configuration is not initialized. setRuntimeConfig must run (via RuntimeConfigProvider) before it is read.");
    }
    return runtimeConfig;
};

/** Test-only helper to reset the singleton between test cases. */
export const resetRuntimeConfigForTests = (): void => {
    runtimeConfig = undefined;
};
