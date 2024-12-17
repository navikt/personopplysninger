import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Alert } from '@navikt/ds-react';
import Box from '@/components/box/Box';
import driftsmeldinger from '@/driftsmeldinger';
import { useStore } from '@/store/Context';
import { basePath } from '@/constants';
import kontonummerIkon from '@/assets/img/Kontonummer.svg';
import { UtenlandskBankkonto } from '@/types/personalia';
import NorskKontonummer from './visning/NorskKontonummer';
import Utenlandskonto from './visning/UtenlandsBankkonto';

const WarningMsg = () => {
    const { locale } = useIntl();

    return (
        <Alert role="status" variant="info">
            <FormattedMessage
                id={'utbetalinger.info'}
                values={{
                    tlfTilKontaktsenter: (text) => (
                        <a href={'tel:+4755553333'} style={{ whiteSpace: 'nowrap' }}>
                            {text}
                        </a>
                    ),
                    lenkeTilKontaktOss: (text) => (
                        <a
                            href={locale === 'en' ? 'https://www.nav.no/kontaktoss/en' : 'https://www.nav.no/kontaktoss'}
                            style={{ whiteSpace: 'nowrap' }}
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
}

const Utbetalinger = (props: UtbetalingerProps) => {
    const { kontonr, utenlandskbank } = props;

    const [{ locale }] = useStore();
    const baseUrlWithLocale = `${basePath}/${locale}`;
    const backTo = window.location.pathname.replace(baseUrlWithLocale, '');

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
            <Link to={`${baseUrlWithLocale}/endre-kontonummer`} state={{ backTo }}>
                <FormattedMessage id={'endreKontonummer.tittel'} />
            </Link>
        </Box>
    );
};

export default Utbetalinger;
