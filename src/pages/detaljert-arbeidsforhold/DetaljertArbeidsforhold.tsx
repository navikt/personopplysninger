import { useEffect } from 'react';
import { DetaljertArbeidsforhold } from '@navikt/arbeidsforhold';
import { useIntl } from 'react-intl';
import arbeidsforholdIkon from '@/assets/img/Arbeidsforhold.svg';
import PageContainer from '@/components/pagecontainer/PageContainer';
import { Params, useParams } from 'react-router-dom';
import { useStore } from '../../store/Context';
import { Locale } from '../../store/Store';

const miljo = process.env.REACT_APP_MILJO?.toUpperCase() as 'LOCAL' | 'DEV' | 'PROD';

interface Routes {
    id: string;
}

const Arbeidsforhold = () => {
    const { locale } = useIntl();
    const params = useParams<Readonly<Params<keyof Routes>>>();
    const [{ personInfo }] = useStore();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (typeof params.id === 'undefined') {
        return null;
    }

    const id: number = parseInt(params.id, 10);

    const printName = personInfo.status === 'RESULT' ? `${personInfo.data.personalia?.fornavn} ${personInfo.data.personalia?.etternavn}` : '';

    const printSSN = personInfo.status === 'RESULT' ? `${personInfo.data.personalia?.personident?.verdi}` : '';

    return (
        <PageContainer
            tittelId="arbeidsforhold.tittel"
            icon={arbeidsforholdIkon}
            brodsmulesti={[{ title: 'arbeidsforhold.tittel' }]}
            backTo={'/#arbeidsforhold'}
        >
            <DetaljertArbeidsforhold
                rolle={'ARBEIDSTAKER'}
                miljo={miljo}
                locale={locale as Locale}
                navArbeidsforholdId={id}
                printActivated={true}
                printName={printName}
                printSSN={printSSN}
            />
        </PageContainer>
    );
};

export default Arbeidsforhold;
