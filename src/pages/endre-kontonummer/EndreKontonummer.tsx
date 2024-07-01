import kontonummerIkon from '../../assets/img/Kontonummer.svg';
import { Alert, Link, Loader } from '@navikt/ds-react';
import { ErrorWithBox } from '../forside/sections/4-personinfo/PersonInfo';
import MedPersonInfo from '../../store/providers/PersonInfo';
import PageContainer from '../../components/pagecontainer/PageContainer';
import { EndreKontonummerView } from './EndreKontonummerView';
import driftsmeldinger from '../../driftsmeldinger';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useStore } from '../../store/Context';
import { basePath } from '../../constants';

export const EndreKontonummer = () => {
    const { state } = useLocation();
    const [{ locale }] = useStore();

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
            <Alert variant="info">
                <FormattedMessage
                    id={'endreKontonummer.info'}
                    values={{
                        br: (text) => (
                            <>
                                <br />
                                {text}
                            </>
                        ),
                        lenkeNavno: (text) => <Link href={'https://www.nav.no'}>{text}</Link>,
                        lenkeDittKontor: (text) => <RouterLink to={`${basePath}/${locale}/#ditt-nav-kontor`}>{text}</RouterLink>,
                    }}
                />
            </Alert>
            {driftsmeldinger.pdl && (
                <Alert role="status" variant="warning">
                    {driftsmeldinger.pdl}
                </Alert>
            )}
            <MedPersonInfo loader={<Loader />} error={ErrorWithBox}>
                {({ personalia }) => (personalia ? <EndreKontonummerView {...personalia} /> : <Loader />)}
            </MedPersonInfo>
        </PageContainer>
    );
};
