import { useEffect } from 'react';
import ErrorMessage, { HTTPError } from '@/components/errorMessage/ErrorMessage';
import { useStore } from '@/store/Context';
import { fetchPersonInfo } from '@/clients/apiClient';
import { PersonInfo } from '@/types/personInfo';
import Box from '../../components/box/Box';
import personaliaIkon from '../../assets/img/Personalia.svg';

export type FetchPersonInfo = { status: 'LOADING' } | { status: 'RESULT'; data: PersonInfo } | { status: 'ERROR'; error: HTTPError };

interface Props {
    loader: JSX.Element;
    error: (error: HTTPError) => JSX.Element;
    children: (data: PersonInfo) => JSX.Element;
}

const MedPersonInfo = (props: Props) => {
    const [{ personInfo }, dispatch] = useStore();

    useEffect(() => {
        if (personInfo.status === 'LOADING') {
            fetchPersonInfo()
                .then((personInfo) =>
                    dispatch({
                        type: 'SETT_PERSON_INFO_RESULT',
                        payload: personInfo as PersonInfo,
                    })
                )
                .catch((error: HTTPError) => dispatch({ type: 'SETT_PERSON_INFO_ERROR', payload: error }));
        }
    }, [personInfo, dispatch]);

    switch (personInfo.status) {
        case 'LOADING':
            return props.loader;
        case 'RESULT':
            return props.children(personInfo.data);
        case 'ERROR':
            return props.error(personInfo.error);
    }
};

export const PersonInfoErrorWithBox = (error: HTTPError) => (
    <Box id="personalia" tittel="personalia.tittel" beskrivelse="personalia.beskrivelse" icon={personaliaIkon}>
        <ErrorMessage error={error} />
    </Box>
);

export default MedPersonInfo;
