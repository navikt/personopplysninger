import kontonummerIkon from '../../assets/img/Kontonummer.svg';
import { Alert, Loader } from '@navikt/ds-react';
import { ErrorWithBox } from '../forside/sections/4-personinfo/PersonInfo';
import MedPersonInfo from '../../store/providers/PersonInfo';
import PageContainer from '../../components/pagecontainer/PageContainer';
import { EndreKontonummerView } from './EndreKontonummerView';
import driftsmeldinger from '../../driftsmeldinger';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const EndreKontonummer = () => {
    const { state } = useLocation();

    const backTo = `${state?.backTo || ''}#utbetaling`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={'endreKontonummer.tittel'}
            icon={kontonummerIkon}
            backTo={backTo}
            brodsmulesti={[{ title: 'endreKontonummer.tittel' }]}
        >
            <>
                {driftsmeldinger.pdl && (
                    <Alert role="status" variant="warning">
                        {driftsmeldinger.pdl}
                    </Alert>
                )}
                <MedPersonInfo loader={<Loader />} error={ErrorWithBox}>
                    {({ personalia }) => (personalia ? <EndreKontonummerView {...personalia} /> : <Loader />)}
                </MedPersonInfo>
            </>
        </PageContainer>
    );
};
