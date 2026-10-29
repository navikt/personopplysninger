import { type RuntimeConfig, RuntimeConfigContext, setRuntimeConfig } from "@/config/runtimeConfig";
import { StoreProvider } from "@/store/Context";
import WithLanguages from "@/store/providers/Language";
import type { Locale } from "@/store/Store";
import DetaljertArbeidsforhold from "@/views/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import { EndreKontonummer } from "@/views/endre-kontonummer/EndreKontonummer";
import EndreOpplysninger from "@/views/endre-personopplysninger/EndreOpplysninger";
import Forside from "@/views/forside/Forside";

type PageProps = {
    page: "forside" | "arbeidsforhold" | "endreKontonummer" | "endreOpplysninger";
};

export type AstroPageProps = PageProps & {
    locale: Locale;
    pathname: string;
    id?: string;
    tjeneste?: string;
    redirectUrl?: string;
    backTo?: string;
};

type Props = AstroPageProps & {
    authName?: string;
    config: RuntimeConfig;
};

const renderPage = (props: Props) => {
    const { pathname, id } = props;

    switch (props.page) {
        case "forside":
            return <Forside pathname={pathname} />;
        case "arbeidsforhold":
            return <DetaljertArbeidsforhold id={id} pathname={pathname} />;
        case "endreKontonummer":
            return <EndreKontonummer backTo={props.backTo} pathname={pathname} />;
        case "endreOpplysninger":
            return <EndreOpplysninger tjeneste={props.tjeneste} redirectUrl={props.redirectUrl} pathname={pathname} />;
    }
};

const AstroPageRoot = (props: Props) => {
    const { locale, authName = "", config } = props;

    if (typeof window !== "undefined") {
        setRuntimeConfig(config);
    }

    return (
        <RuntimeConfigContext.Provider value={config}>
            <StoreProvider
                initialLocale={locale}
                initialAuthInfo={{ status: "RESULT", data: { authenticated: true, securityLevel: "4", name: authName } }}
            >
                <WithLanguages>
                    <div className="pagecontent">
                        <div className="wrapper">{renderPage(props)}</div>
                    </div>
                </WithLanguages>
            </StoreProvider>
        </RuntimeConfigContext.Provider>
    );
};

export default AstroPageRoot;
