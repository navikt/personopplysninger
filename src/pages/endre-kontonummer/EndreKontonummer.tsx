import kontonummerIkon from '../../assets/img/Kontonummer.svg';
import { Alert, Loader } from '@navikt/ds-react';
import { ErrorWithBox } from '../forside/sections/4-personinfo/PersonInfo';
import MedPersonInfo from '../../store/providers/PersonInfo';
import PageContainer from '../../components/pagecontainer/PageContainer';
import { EndreKontonummerView } from './EndreKontonummerView';
import driftsmeldinger from '../../driftsmeldinger';
import { useEffect } from 'react';

export const EndreKontonummer = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={'endreKontonummer.tittel'}
            icon={kontonummerIkon}
            backTo={'#utbetaling'}
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
