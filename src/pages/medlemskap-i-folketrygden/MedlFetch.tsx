import { useEffect } from 'react';
import { fetchMedlInfo } from '@/clients/apiClient';
import ErrorMessage, { HTTPError } from '@/components/errorMessage/ErrorMessage';
import { useStore } from '@/store/Context';
import Spinner from '@/components/spinner/Spinner';
import { MedlInfo } from '@/types/medl';

export type FetchMedlInfo = { status: 'LOADING' } | { status: 'RESULT'; data: MedlInfo } | { status: 'ERROR'; error: HTTPError };

interface Props {
    children: (data: { data: MedlInfo; id?: string }) => JSX.Element;
}

const WithMEDL = (props: Props) => {
    const [{ medlInfo }, dispatch] = useStore();
    const { children } = props;

    useEffect(() => {
        if (medlInfo.status === 'LOADING') {
            fetchMedlInfo()
                .then((medl) =>
                    dispatch({
                        type: 'SETT_MEDL_INFO_RESULT',
                        payload: medl as MedlInfo,
                    })
                )
                .catch((error: HTTPError) =>
                    dispatch({
                        type: 'SETT_MEDL_INFO_ERROR',
                        payload: error,
                    })
                );
        }
    }, [medlInfo, dispatch]);

    switch (medlInfo.status) {
        case 'LOADING':
            return <Spinner />;
        case 'RESULT':
            return children({ data: medlInfo.data });
        case 'ERROR':
            return <ErrorMessage error={medlInfo.error} />;
    }
};

export default WithMEDL;
