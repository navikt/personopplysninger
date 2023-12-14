import Box from 'components/box/Box';
import kontonummerIkon from 'assets/img/Kontonummer.svg';
import { UtenlandskBankkonto } from 'types/personalia';
import NorskKontonummer from './visning/NorskKontonummer';
import Utenlandskonto from './visning/UtenlandsBankkonto';
import { FormattedMessage } from 'react-intl';
import { Alert } from '@navikt/ds-react';
import driftsmeldinger from 'driftsmeldinger';
import { Link } from 'react-router-dom';
import { basePath } from '../../../../../App';
import { useStore } from '../../../../../store/Context';

export interface UtbetalingerProps {
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
    kontonr?: string;
    kontoregisterStatus: string;
}

const Utbetalinger = (props: UtbetalingerProps) => {
    const { kontonr, utenlandskbank } = props;

    const [{ locale }] = useStore();

    return (
        <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon} visAnkerlenke>
            <>
                {driftsmeldinger.pdl && (
                    <Alert role="status" variant="warning">
                        {driftsmeldinger.pdl}
                    </Alert>
                )}
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
                <Link to={`${basePath}/${locale}/endre-kontonummer`}>
                    <FormattedMessage id={'endreKontonummer.tittel'} />
                </Link>
            </>
        </Box>
    );
};

export default Utbetalinger;
