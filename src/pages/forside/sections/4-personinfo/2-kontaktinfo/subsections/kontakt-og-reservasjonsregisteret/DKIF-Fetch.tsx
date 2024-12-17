import { useEffect } from 'react';
import ErrorMessage, { HTTPError } from '@/components/errorMessage/ErrorMessage';
import Spinner from '@/components/spinner/Spinner';
import { useStore } from '@/store/Context';
import { fetchKontaktInfo } from '@/clients/apiClient';
import { KontaktInfo } from '@/types/kontaktInfo';
import KontaktInformasjon from './DKIF';

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
            {(() => {
                switch (kontaktInfo.status) {
                    case 'LOADING':
                        return <Spinner />;
                    case 'RESULT':
                        return <KontaktInformasjon info={kontaktInfo.data} />;
                    case 'ERROR':
                        return <ErrorMessage error={kontaktInfo.error} />;
                }
            })()}
        </>
    );
};

export default DKIF;
