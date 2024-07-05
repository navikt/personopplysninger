import { useEffect } from 'react';
import Sidetittel from './sections/1-sidetittel/Sidetittel';
import PersonInfo from './sections/4-personinfo/PersonInfo';
import Arbeidsforhold from './sections/5-arbeidsforhold/Arbeidsforhold';
import EksterneLenker from './sections/6-flere-opplysninger/Lenker';
import MerInformasjon from './sections/7-mer-informasjon/MerInformasjon';
import Header from './sections/3-header/Header';
import Brodsmulesti from './sections/2-brodsmulesti/Brodsmulesti';
import { Params, useParams } from 'react-router-dom';
import RedirectKnapp from '@/components/knapper/Redirect';
import { smoothScrollToTarget } from '@/utils/scroll-to';
import { useStore } from '@/store/Context';

interface Routes {
    tjeneste?: string;
    redirectUrl?: string;
}

const Forside = () => {
    const params = useParams<Readonly<Params<keyof Routes>>>();
    const { tjeneste, redirectUrl } = params;

    const [{ authInfo, personInfo, kontaktInfo }] = useStore();

    const isLoaded = ![authInfo, personInfo, kontaktInfo].some((item) => item.status === 'LOADING');

    useEffect(() => {
        if (isLoaded) {
            smoothScrollToTarget(document.location.hash);
        }
    }, [isLoaded]);

    return (
        <>
            <Brodsmulesti />
            <Sidetittel />
            <Header />
            <PersonInfo />
            <Arbeidsforhold />
            <EksterneLenker />
            <MerInformasjon />
            <RedirectKnapp tjeneste={tjeneste} encodedUrl={redirectUrl} />
        </>
    );
};

export default Forside;
