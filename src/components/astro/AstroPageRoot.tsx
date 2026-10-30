import { type RuntimeConfig, RuntimeConfigContext, setRuntimeConfig } from "@/config/runtimeConfig";
import { StoreProvider } from "@/store/Context";
import WithLanguages from "@/store/providers/Language";
import type { Locale } from "@/store/Store";
import DetaljertArbeidsforhold from "@/views/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import EndreOpplysninger from "@/views/endre-personopplysninger/EndreOpplysninger";

type PageProps = {
    page: "arbeidsforhold" | "endreOpplysninger";
};

export type AstroPageProps = PageProps & {
    locale: Locale;
    pathname: string;
    id?: string;
    tjeneste?: string;
    redirectUrl?: string;
};

type Props = AstroPageProps & {
    config: RuntimeConfig;
};

const renderPage = (props: Props) => {
    const { pathname, id } = props;

    switch (props.page) {
        case "arbeidsforhold":
            return <DetaljertArbeidsforhold id={id} pathname={pathname} />;
        case "endreOpplysninger":
            return <EndreOpplysninger tjeneste={props.tjeneste} redirectUrl={props.redirectUrl} pathname={pathname} />;
    }
};

const AstroPageRoot = (props: Props) => {
    const { locale, config } = props;

    if (typeof window !== "undefined") {
        setRuntimeConfig(config);
    }

    return (
        <RuntimeConfigContext.Provider value={config}>
            <StoreProvider initialLocale={locale}>
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
