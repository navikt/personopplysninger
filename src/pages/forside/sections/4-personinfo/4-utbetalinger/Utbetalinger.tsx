import { Alert } from "@navikt/ds-react";
import { FormattedMessage, useIntl } from "react-intl";
import kontonummerIkon from "@/assets/img/Kontonummer.svg";
import Box from "@/components/box/Box";
import { basePath } from "@/constants";
import driftsmeldinger from "@/driftsmeldinger";
import { useStore } from "@/store/Context";
import type { UtenlandskBankkonto } from "@/types/personalia";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";

const WarningMsg = () => {
    const { locale } = useIntl();

    return (
        <Alert role="status" variant="info">
            <FormattedMessage
                id={"utbetalinger.info"}
                values={{
                    tlfTilKontaktsenter: (text) => (
                        <a href={"tel:+4755553333"} style={{ whiteSpace: "nowrap" }}>
                            {text}
                        </a>
                    ),
                    lenkeTilKontaktOss: (text) => (
                        <a
                            href={locale === "en" ? "https://www.nav.no/kontaktoss/en" : "https://www.nav.no/kontaktoss"}
                            style={{ whiteSpace: "nowrap" }}
                        >
                            {text}
                        </a>
                    ),
                }}
            />
        </Alert>
    );
};

export interface UtbetalingerProps {
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
    kontonr?: string;
    kontoregisterStatus: string;
    pathname?: string;
}

const Utbetalinger = (props: UtbetalingerProps) => {
    const { kontonr, utenlandskbank, pathname } = props;

    const [{ locale }] = useStore();
    const baseUrlWithLocale = `${basePath}/${locale}`;
    const currentPathname = pathname ?? (typeof window === "undefined" ? "" : window.location.pathname);
    const backTo = currentPathname.replace(baseUrlWithLocale, "");
    const backToQuery = backTo ? `?backTo=${encodeURIComponent(backTo)}` : "";

    return (
        <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon} visAnkerlenke>
            {driftsmeldinger.pdl && (
                <Alert role="status" variant="warning">
                    {driftsmeldinger.pdl}
                </Alert>
            )}
            <WarningMsg />
            {kontonr || utenlandskbank ? (
                <>
                    <NorskKontonummer kontonummer={kontonr} />
                    <Utenlandskonto utenlandskBankkonto={utenlandskbank} />
                </>
            ) : (
                <div className="underseksjon__beskrivelse">
                    <FormattedMessage
                        id="personalia.kontonr.ingenData"
                        values={{
                            br: (text) => (
                                <>
                                    <br />
                                    {text}
                                </>
                            ),
                        }}
                    />
                </div>
            )}
            <a href={`${baseUrlWithLocale}/endre-kontonummer${backToQuery}`}>
                <FormattedMessage id={"endreKontonummer.tittel"} />
            </a>
        </Box>
    );
};

export default Utbetalinger;
