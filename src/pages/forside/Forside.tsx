import { useEffect } from "react";
import RedirectKnapp from "@/components/knapper/Redirect";
import { useStore } from "@/store/Context";
import { smoothScrollToTarget } from "@/utils/scroll-to";
import Sidetittel from "./sections/1-sidetittel/Sidetittel";
import Brodsmulesti from "./sections/2-brodsmulesti/Brodsmulesti";
import Header from "./sections/3-header/Header";
import PersonInfo from "./sections/4-personinfo/PersonInfo";
import Arbeidsforhold from "./sections/5-arbeidsforhold/Arbeidsforhold";
import EksterneLenker from "./sections/6-flere-opplysninger/Lenker";
import MerInformasjon from "./sections/7-mer-informasjon/MerInformasjon";

interface Props {
    tjeneste?: string;
    redirectUrl?: string;
    pathname?: string;
}

const Forside = ({ tjeneste, redirectUrl, pathname }: Props) => {
    const [{ authInfo, personInfo, kontaktInfo }] = useStore();

    const isLoaded = ![authInfo, personInfo, kontaktInfo].some((item) => item.status === "LOADING");

    useEffect(() => {
        if (isLoaded) {
            smoothScrollToTarget(document.location.hash);
        }
    }, [isLoaded]);

    return (
        <>
            <Brodsmulesti pathname={pathname} />
            <Sidetittel />
            <Header />
            <PersonInfo pathname={pathname} />
            <Arbeidsforhold />
            <EksterneLenker />
            <MerInformasjon />
            <RedirectKnapp tjeneste={tjeneste} encodedUrl={redirectUrl} />
        </>
    );
};

export default Forside;
