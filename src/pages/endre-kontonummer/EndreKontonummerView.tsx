import { useState } from 'react';
import { Alert } from '@navikt/ds-react';
import KontonummerForm from '../forside/sections/4-personinfo/4-utbetalinger/endring/KontonummerForm';
import NorskKontonummer from '../forside/sections/4-personinfo/4-utbetalinger/visning/NorskKontonummer';
import Utenlandskonto from '../forside/sections/4-personinfo/4-utbetalinger/visning/UtenlandsBankkonto';
import { FormattedMessage } from 'react-intl';
import Kilde from '../../components/kilde/Kilde';
import { PencilIcon } from '@navikt/aksel-icons';
import { UtbetalingerProps } from '../forside/sections/4-personinfo/4-utbetalinger/Utbetalinger';
import { useIntlFormatter } from '../../hooks/useIntlFormatter';

export const EndreKontonummerView = ({ kontoregisterStatus, utenlandskbank, personident, kontonr }: UtbetalingerProps) => {
    const [opprettEllerEndre, settOpprettEllerEndre] = useState<boolean>(false);
    const { formatMessage } = useIntlFormatter();

    return (
        <>
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
                        kilde={'personalia.source.nav'}
                        onClick={() => settOpprettEllerEndre(true)}
                        lenkeTekst={kontonr || utenlandskbank ? 'side.endre' : 'side.leggtil'}
                        lenkeType={'KNAPP'}
                        ikon={PencilIcon}
                    />
                </>
            )}
        </>
    );
};
