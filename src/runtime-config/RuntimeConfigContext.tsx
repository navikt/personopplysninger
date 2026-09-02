import { createContext, type ReactNode, useContext } from "react";
import { setRuntimeConfig } from "./runtimeConfig";
import type { RuntimeConfig } from "./types";

const RuntimeConfigContext = createContext<RuntimeConfig | undefined>(undefined);

interface Props {
    config: RuntimeConfig;
    children: ReactNode;
}

/**
 * Makes the server-resolved runtime configuration available to the React
 * compatibility island, both via React context (`useRuntimeConfig`) and via
 * the plain-module singleton in `runtimeConfig.ts` (for non-component code
 * such as API clients).
 */
export const RuntimeConfigProvider = ({ config, children }: Props) => {
    setRuntimeConfig(config);
    return <RuntimeConfigContext.Provider value={config}>{children}</RuntimeConfigContext.Provider>;
};

export const useRuntimeConfig = (): RuntimeConfig => {
    const config = useContext(RuntimeConfigContext);
    if (!config) {
        throw new Error("useRuntimeConfig must be used within a RuntimeConfigProvider");
    }
    return config;
};
