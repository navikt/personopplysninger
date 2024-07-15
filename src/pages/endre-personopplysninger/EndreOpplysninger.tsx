import { Params, useParams } from 'react-router-dom';
import RedirectKnapp from '@/components/knapper/Redirect';
import MedPersonInfo from '@/store/providers/PersonInfo';
import Spinner from '@/components/spinner/Spinner';
import ErrorMessage, { HTTPError } from '@/components/errorMessage/ErrorMessage';
import EndreOpplysningerView from './EndreOpplysningerView';

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
        <div className="endreOpplysninger__page">
            <div className="endreOpplysninger__container pagecontent">
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
