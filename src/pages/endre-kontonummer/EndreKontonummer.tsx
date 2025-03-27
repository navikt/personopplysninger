import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { Alert, Link, Loader } from '@navikt/ds-react';
import { ErrorWithBox } from '../forside/sections/4-personinfo/PersonInfo';
import MedPersonInfo from '@/store/providers/PersonInfo';
import PageContainer from '@/components/pagecontainer/PageContainer';
import kontonummerIkon from '@/assets/img/Kontonummer.svg';
import driftsmeldinger from '../../driftsmeldinger';
import { EndreKontonummerView } from './EndreKontonummerView';

export const EndreKontonummer = () => {
    const { state } = useLocation();

    const intl = useIntl();
    const lenkeUrl = intl.formatMessage({ id: 'endreKontonummer.lenkeURL' });

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
            {driftsmeldinger.pdl && (
                <Alert role="status" variant="warning">
                    {driftsmeldinger.pdl}
                </Alert>
            )}
            <MedPersonInfo loader={<Loader />} error={ErrorWithBox}>
                {({ personalia }) => (personalia ? <EndreKontonummerView {...personalia} /> : <Loader />)}
            </MedPersonInfo>
            <Alert variant="info">
                <FormattedMessage
                    id="endreKontonummer.info"
                    values={{
                        br: (text) => (
                            <>
                                <br />
                                {text}
                            </>
                        ),
                        lenkeNavno: (text) => <Link href={lenkeUrl}>{text}</Link>,
                    }}
                />
            </Alert>
        </PageContainer>
    );
};
