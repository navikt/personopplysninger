import ErrorMessage from "@/components/errorMessage/ErrorMessage";
import RedirectKnapp from "@/components/knapper/Redirect";
import Spinner from "@/components/spinner/Spinner";
import MedPersonInfo from "@/store/providers/PersonInfo";
import styles from "./EndreOpplysninger.module.css";
import EndreOpplysningerView from "./EndreOpplysningerView";

interface Props {
    tjeneste?: string;
    redirectUrl?: string;
    pathname: string;
}

const EndreOpplysninger = ({ tjeneste, redirectUrl, pathname }: Props) => {
    return (
        <div className={styles.page}>
            <div className={`${styles.container} pagecontent`}>
                <RedirectKnapp tjeneste={tjeneste} encodedUrl={redirectUrl} />
                <MedPersonInfo loader={<Spinner />} error={(error) => <ErrorMessage error={error} />}>
                    {({ personalia, adresser }) => <EndreOpplysningerView personalia={personalia} adresser={adresser} pathname={pathname} />}
                </MedPersonInfo>
            </div>
        </div>
    );
};

export default EndreOpplysninger;
