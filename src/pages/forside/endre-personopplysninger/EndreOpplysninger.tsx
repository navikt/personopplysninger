import React from "react";
import Adresser from "pages/forside/sections/4-personinfo/3-adresser/Adresser-PDL";
import Utbetalinger from "pages/forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";
import Box from "components/box/Box";
import { useParams } from "react-router-dom";
import kontaktIkon from "assets/img/Kontakt.svg";
import RedirectKnapp from "components/knapper/Redirect";
import PDLTelefonnummerHosNav from "pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/TelefonnummerHosNav-PDL";
import MedPersonInfo from "store/providers/PersonInfo";
import Spinner from "components/spinner/Spinner";
import Error, { HTTPError } from "../../../components/error/Error";
import personaliaIkon from "../../../assets/img/Personalia.svg";

interface Routes {
  tjeneste?: string;
  redirectUrl?: string;
}

const EndreAlleOpplysninger = () => {
  const params = useParams<Routes>();
  const { tjeneste, redirectUrl } = params;

  return (
    <div className="endreOpplysninger__page">
      <div className="endreOpplysninger__container pagecontent">
        {tjeneste && redirectUrl && (
          <RedirectKnapp tjeneste={tjeneste} redirectUrl={redirectUrl} />
        )}
        <MedPersonInfo loader={<Spinner />} error={ErrorFunc}>
          {({ personalia, adresser }) => {
            return (
              <>
                {personalia && (
                  <Box
                    id="kontaktinformasjon"
                    tittel="kontaktinfo.tittel"
                    icon={kontaktIkon}
                  >
                    <PDLTelefonnummerHosNav tlfnr={personalia.tlfnr} />
                  </Box>
                )}
                {adresser && <Adresser adresser={adresser} />}
                {personalia && (
                  <Utbetalinger
                    kontonr={personalia.kontonr}
                    utenlandskbank={personalia.utenlandskbank}
                  />
                )}
              </>
            );
          }}
        </MedPersonInfo>
      </div>
    </div>
  );
};

export const ErrorFunc = (error: HTTPError) => <Error error={error} />;
export default EndreAlleOpplysninger;
