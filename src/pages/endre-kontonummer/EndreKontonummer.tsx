import React, { useState } from 'react';
import { useIntlFormatter } from '../../hooks/useIntlFormatter';
import Box from '../../components/box/Box';
import kontonummerIkon from '../../assets/img/Kontonummer.svg';
import driftsmeldinger from '../../driftsmeldinger';
import { Alert, Loader } from '@navikt/ds-react';
import KontonummerForm from '../forside/sections/4-personinfo/4-utbetalinger/endring/KontonummerForm';
import NorskKontonummer from '../forside/sections/4-personinfo/4-utbetalinger/visning/NorskKontonummer';
import Utenlandskonto from '../forside/sections/4-personinfo/4-utbetalinger/visning/UtenlandsBankkonto';
import { FormattedMessage } from 'react-intl';
import Kilde from '../../components/kilde/Kilde';
import { PencilIcon } from '@navikt/aksel-icons';
import { ErrorWithBox } from '../forside/sections/4-personinfo/PersonInfo';
import MedPersonInfo from '../../store/providers/PersonInfo';

export const EndreKontonummer = () => {
    const [opprettEllerEndre, settOpprettEllerEndre] = useState<boolean>(false);

    const { formatMessage } = useIntlFormatter();

    return (
        <Box id="utbetaling" tittel="utbetalinger.tittel" icon={kontonummerIkon}>
            <MedPersonInfo loader={<Loader />} error={ErrorWithBox}>
                {({ personalia }) => {
                    if (!personalia) {
                        return <Loader />;
                    }

                    const { kontonr, utenlandskbank, personident, kontoregisterStatus } = personalia;

                    return (
                        <>
                            {driftsmeldinger.pdl && (
                                <Alert role="status" variant="warning">
                                    {driftsmeldinger.pdl}
                                </Alert>
                            )}
                            {kontoregisterStatus === 'ERROR' ? (
                                <Alert role="alert" variant="error">
                                    {formatMessage('personalia.kontonr.feilmelding')}
                                </Alert>
                            ) : opprettEllerEndre ? (
                                <KontonummerForm
                                    utenlandskbank={utenlandskbank}
                                    personident={personident}
                                    kontonr={kontonr}
                                    settOpprettEllerEndre={settOpprettEllerEndre}
                                />
                            ) : (
                                <>
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
                                    <Kilde
                                        kilde="personalia.source.nav"
                                        onClick={() => settOpprettEllerEndre(true)}
                                        lenkeTekst={kontonr || utenlandskbank ? 'side.endre' : 'side.leggtil'}
                                        lenkeType={'KNAPP'}
                                        ikon={PencilIcon}
                                    />
                                </>
                            )}
                        </>
                    );
                }}
            </MedPersonInfo>
        </Box>
    );
};
