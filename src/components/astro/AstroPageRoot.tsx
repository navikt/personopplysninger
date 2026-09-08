import type { ReactNode } from "react";
import DetaljertArbeidsforhold from "@/pages/detaljert-arbeidsforhold/DetaljertArbeidsforhold";
import DsopDetaljer from "@/pages/digital-samhandling-offentlig-privat/detaljer/DsopDetaljer";
import DsopHistorikk from "@/pages/digital-samhandling-offentlig-privat/historikk/DsopHistorikk";
import { EndreKontonummer } from "@/pages/endre-kontonummer/EndreKontonummer";
import EndreOpplysninger from "@/pages/endre-personopplysninger/EndreOpplysninger";
import Forside from "@/pages/forside/Forside";
import InstDetaljer from "@/pages/institusjonsopphold/detaljer/InstDetaljer";
import InstHistorikk from "@/pages/institusjonsopphold/historikk/InstHistorikk";
import MedlHistorikk from "@/pages/medlemskap-i-folketrygden/MedlHistorikk";
import { StoreProvider } from "@/store/Context";
import WithLanguages from "@/store/providers/Language";
import type { Locale } from "@/store/Store";

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
}

const AstroPageRoot = ({ page, locale, pathname, authName = "", id, tjeneste, redirectUrl, backTo }: Props) => {
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
        <StoreProvider
            initialLocale={locale}
            initialAuthInfo={{ status: "RESULT", data: { authenticated: true, securityLevel: "4", name: authName } }}
        >
            <WithLanguages>
                <div className="pagecontent">
                    <div className="wrapper">{pages[page]}</div>
                </div>
            </WithLanguages>
        </StoreProvider>
    );
};

export default AstroPageRoot;
