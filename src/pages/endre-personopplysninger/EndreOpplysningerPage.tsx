import React from "react";
import { useParams } from "react-router-dom";
import RedirectKnapp from "components/knapper/Redirect";
import MedPersonInfo from "store/providers/PersonInfo";
import Spinner from "components/spinner/Spinner";
import Error, { HTTPError } from "components/error/Error";
import EndreOpplysninger from "./EndreOpplysninger";

interface Routes {
  tjeneste?: string;
  redirectUrl?: string;
}

const EndreOpplysningerPage = () => {
  const params = useParams<Routes>();
  const { tjeneste, redirectUrl } = params;

  return (
    <div className="endreOpplysninger__page">
      <div className="endreOpplysninger__container pagecontent">
        <RedirectKnapp tjeneste={tjeneste} encodedUrl={redirectUrl} />
        <MedPersonInfo loader={<Spinner />} error={ErrorFunc}>
          {({ personalia, adresser }) => (
            <EndreOpplysninger personalia={personalia} adresser={adresser} />
          )}
        </MedPersonInfo>
      </div>
    </div>
  );
};

export const ErrorFunc = (error: HTTPError) => <Error error={error} />;
export default EndreOpplysningerPage;