import { type ReactNode, useEffect } from "react";
import { type RuntimeConfig, RuntimeConfigContext, setRuntimeConfig } from "@/config/runtimeConfig";
import { StoreProvider } from "@/store/Context";
import WithLanguages from "@/store/providers/Language";
import type { InitialData, Locale } from "@/store/Store";
import type { DsopDetaljInnslag, DsopHistorikkInfo } from "@/types/dsop";
import type { HentetData } from "@/types/hentetData";
import type { InstInfo, InstInnslag } from "@/types/inst";
import { startFaro } from "@/utils/faro";
import DetaljertArbeidsforhold from "@/views/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import DsopDetaljer from "@/views/digital-samhandling-offentlig-privat/detaljer/DsopDetaljer";
import DsopHistorikk from "@/views/digital-samhandling-offentlig-privat/historikk/DsopHistorikk";
import { EndreKontonummer } from "@/views/endre-kontonummer/EndreKontonummer";
import EndreOpplysninger from "@/views/endre-personopplysninger/EndreOpplysninger";
import Forside from "@/views/forside/Forside";
import InstDetaljer from "@/views/institusjonsopphold/detaljer/InstDetaljer";
import InstHistorikk from "@/views/institusjonsopphold/historikk/InstHistorikk";
import MedlHistorikk from "@/views/medlemskap-i-folketrygden/MedlHistorikk";

type PageProps =
    | {
          page: "forside" | "arbeidsforhold" | "medlemskap" | "endreKontonummer" | "endreOpplysninger";
      }
    | { page: "dsopHistorikk"; dsopInfo: HentetData<DsopHistorikkInfo> }
    | { page: "dsopDetaljer"; innslag: HentetData<DsopDetaljInnslag | undefined> }
    | { page: "institusjonsoppholdHistorikk"; instInfo: HentetData<InstInfo> }
    | { page: "institusjonsoppholdDetaljer"; innslag: HentetData<InstInnslag | undefined> };

export type AstroPage = PageProps["page"];

export type AstroPageProps = PageProps & {
    locale: Locale;
    pathname: string;
    id?: string;
    tjeneste?: string;
    redirectUrl?: string;
    backTo?: string;
    initialData?: InitialData;
};

type Props = AstroPageProps & {
    authName?: string;
    config: RuntimeConfig;
};

const renderPage = (props: Props): ReactNode => {
    const { pathname, id } = props;

    switch (props.page) {
        case "forside":
            return <Forside pathname={pathname} />;
        case "arbeidsforhold":
            return <DetaljertArbeidsforhold id={id} pathname={pathname} />;
        case "dsopHistorikk":
            return <DsopHistorikk dsopInfo={props.dsopInfo} pathname={pathname} />;
        case "dsopDetaljer":
            return <DsopDetaljer innslag={props.innslag} pathname={pathname} />;
        case "institusjonsoppholdHistorikk":
            return <InstHistorikk instInfo={props.instInfo} pathname={pathname} />;
        case "institusjonsoppholdDetaljer":
            return <InstDetaljer innslag={props.innslag} pathname={pathname} />;
        case "medlemskap":
            return <MedlHistorikk pathname={pathname} />;
        case "endreKontonummer":
            return <EndreKontonummer backTo={props.backTo} pathname={pathname} />;
        case "endreOpplysninger":
            return <EndreOpplysninger tjeneste={props.tjeneste} redirectUrl={props.redirectUrl} pathname={pathname} />;
    }
};

const AstroPageRoot = (props: Props) => {
    const { locale, authName = "", config, initialData } = props;

    if (typeof window !== "undefined") {
        setRuntimeConfig(config);
    }

    useEffect(() => {
        startFaro();
    }, []);

    return (
        <RuntimeConfigContext.Provider value={config}>
            <StoreProvider
                initialLocale={locale}
                initialAuthInfo={{ status: "RESULT", data: { authenticated: true, securityLevel: "4", name: authName } }}
                initialData={initialData}
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
