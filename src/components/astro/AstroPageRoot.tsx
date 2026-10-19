import { type ReactNode, useEffect } from "react";
import { type RuntimeConfig, RuntimeConfigContext, setRuntimeConfig } from "@/config/runtimeConfig";
import { StoreProvider } from "@/store/Context";
import WithLanguages from "@/store/providers/Language";
import type { InitialData, Locale } from "@/store/Store";
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

export type AstroPage =
    | "forside"
    | "arbeidsforhold"
    | "dsopHistorikk"
    | "dsopDetaljer"
    | "institusjonsoppholdHistorikk"
    | "institusjonsoppholdDetaljer"
    | "medlemskap"
    | "endreKontonummer"
    | "endreOpplysninger";

interface Props {
    page: AstroPage;
    locale: Locale;
    pathname: string;
    authName?: string;
    id?: string;
    tjeneste?: string;
    redirectUrl?: string;
    backTo?: string;
    config: RuntimeConfig;
    initialData?: InitialData;
}

const AstroPageRoot = ({ page, locale, pathname, authName = "", id, tjeneste, redirectUrl, backTo, config, initialData }: Props) => {
    // Kode utenfor React (API-klient, Faro) leser den globale verdien. Settes kun i nettleseren,
    // fordi serveren deler modulen mellom samtidige forespørsler.
    if (typeof window !== "undefined") {
        setRuntimeConfig(config);
    }

    useEffect(() => {
        startFaro();
    }, []);

    const pages: Record<AstroPage, ReactNode> = {
        forside: <Forside pathname={pathname} />,
        arbeidsforhold: <DetaljertArbeidsforhold id={id} pathname={pathname} />,
        dsopHistorikk: <DsopHistorikk pathname={pathname} />,
        dsopDetaljer: <DsopDetaljer id={id} pathname={pathname} />,
        institusjonsoppholdHistorikk: <InstHistorikk pathname={pathname} />,
        institusjonsoppholdDetaljer: <InstDetaljer id={id} pathname={pathname} />,
        medlemskap: <MedlHistorikk pathname={pathname} />,
        endreKontonummer: <EndreKontonummer backTo={backTo} pathname={pathname} />,
        endreOpplysninger: <EndreOpplysninger tjeneste={tjeneste} redirectUrl={redirectUrl} pathname={pathname} />,
    };

    return (
        <RuntimeConfigContext.Provider value={config}>
            <StoreProvider
                initialLocale={locale}
                initialAuthInfo={{ status: "RESULT", data: { authenticated: true, securityLevel: "4", name: authName } }}
                initialData={initialData}
            >
                <WithLanguages>
                    <div className="pagecontent">
                        <div className="wrapper">{pages[page]}</div>
                    </div>
                </WithLanguages>
            </StoreProvider>
        </RuntimeConfigContext.Provider>
    );
};

export default AstroPageRoot;
