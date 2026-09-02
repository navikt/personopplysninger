import { type Params, useParams } from "react-router-dom";
import ErrorMessage, { type HTTPError } from "@/components/errorMessage/ErrorMessage";
import RedirectKnapp from "@/components/knapper/Redirect";
import Spinner from "@/components/spinner/Spinner";
import MedPersonInfo from "@/store/providers/PersonInfo";
import styles from "./EndreOpplysninger.module.css";
import EndreOpplysningerView from "./EndreOpplysningerView";

interface Routes {
    tjeneste?: string;
    redirectUrl?: string;
}

type EndreOpplysningerProps = {
    tjeneste: string;
};

const EndreOpplysninger = ({ tjeneste }: EndreOpplysningerProps) => {
    const params = useParams<Readonly<Params<keyof Routes>>>();
    const { redirectUrl } = params;

    return (
        <div className={styles.page}>
            <div className={`${styles.container} pagecontent`}>
                <RedirectKnapp tjeneste={tjeneste} encodedUrl={redirectUrl} />
                <MedPersonInfo loader={<Spinner />} error={ErrorFunc}>
                    {({ personalia, adresser }) => <EndreOpplysningerView personalia={personalia} adresser={adresser} />}
                </MedPersonInfo>
            </div>
        </div>
    );
};

export const ErrorFunc = (error: HTTPError) => <ErrorMessage error={error} />;
export default EndreOpplysninger;
