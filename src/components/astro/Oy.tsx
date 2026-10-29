import { type RuntimeConfig, RuntimeConfigContext, setRuntimeConfig } from "@/config/runtimeConfig";
import { StoreProvider } from "@/store/Context";
import WithLanguages from "@/store/providers/Language";
import type { Locale } from "@/store/Store";
import type { PersonInfo } from "@/types/personInfo";

interface Props {
    locale: Locale;
    config: RuntimeConfig;
    personInfo: PersonInfo;
    children: JSX.Element;
}

const Oy = ({ locale, config, personInfo, children }: Props) => {
    if (typeof window !== "undefined") {
        setRuntimeConfig(config);
    }

    return (
        <RuntimeConfigContext.Provider value={config}>
            <StoreProvider initialLocale={locale} initialPersonInfo={personInfo}>
                <WithLanguages>{children}</WithLanguages>
            </StoreProvider>
        </RuntimeConfigContext.Provider>
    );
};

export default Oy;
