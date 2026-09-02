import App from "@/App";
import { RuntimeConfigProvider } from "@/runtime-config/RuntimeConfigContext";
import type { RuntimeConfig } from "@/runtime-config/types";
import { StoreProvider } from "@/store/Context";
import WithLanguages from "@/store/providers/Language";
import type { Locale } from "@/store/Store";

// tokens.css/global.css are imported once, server-side, by Layout.astro,
// since they style the SSR'd `.pagewrapper`/`.app` shell around this island.

export interface ReactAppProps {
    runtimeConfig: RuntimeConfig;
    locale: Locale;
}

/**
 * React Router compatibility island. Mounted via `client:only="react"` from
 * `src/pages/[locale]/[...path].astro`, so every existing deep link renders
 * the same React app shell it did under the previous Vite/Express runtime.
 * Astro serializes `runtimeConfig`/`locale` props into the page automatically.
 */
const ReactApp = ({ runtimeConfig, locale }: ReactAppProps) => (
    <RuntimeConfigProvider config={runtimeConfig}>
        <StoreProvider initialLocale={locale}>
            <WithLanguages>
                <App />
            </WithLanguages>
        </StoreProvider>
    </RuntimeConfigProvider>
);

export default ReactApp;
