import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Error, { HTTPError } from 'components/error/Error';
import Spinner from 'components/spinner/Spinner';
import { fetchKontaktInfo } from 'clients/apiClient';
import { KontaktInfo } from 'types/kontaktInfo';
import KontaktInformasjon from './DKIF';
import { useStore } from 'store/Context';
import Infotekst from 'components/infotekst/Infotekst';
import { Heading } from '@navikt/ds-react';

export type FetchKontaktInfo = { status: 'LOADING' } | { status: 'RESULT'; data: KontaktInfo } | { status: 'ERROR'; error: HTTPError };

const DKIF = () => {
    const [{ kontaktInfo }, dispatch] = useStore();

    useEffect(() => {
        if (kontaktInfo.status === 'LOADING') {
            fetchKontaktInfo()
                .then((kontaktInfo) =>
                    dispatch({
                        type: 'SETT_KONTAKT_INFO_RESULT',
                        payload: kontaktInfo as KontaktInfo,
                    })
                )
                .catch((error: HTTPError) => dispatch({ type: 'SETT_KONTAKT_INFO_ERROR', payload: error }));
        }
    }, [kontaktInfo, dispatch]);

    return (
        <>
            <div className="underseksjon__header underseksjon__divider dkif__overskrift-container">
                <Heading size={'small'} level={'3'}>
                    <FormattedMessage id="personalia.dkif.overskrift" />
                </Heading>
                <Infotekst overskriftID="personalia.dkif.overskrift" beskrivelseID="personalia.dkif.beskrivelse" />
            </div>
            {(() => {
                switch (kontaktInfo.status) {
                    case 'LOADING':
                        return <Spinner />;
                    case 'RESULT':
                        return <KontaktInformasjon info={kontaktInfo.data} />;
                    case 'ERROR':
                        return <Error error={kontaktInfo.error} />;
                }
            })()}
        </>
    );
};

export default DKIF;
