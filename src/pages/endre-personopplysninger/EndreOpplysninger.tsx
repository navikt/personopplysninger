import React from "react";
import Adresser from "pages/forside/sections/4-personinfo/3-adresser/Adresser";
import Utbetalinger from "pages/forside/sections/4-personinfo/4-utbetalinger/Utbetalinger";
import Box from "components/box/Box";
import { useParams } from "react-router-dom";
import kontaktIkon from "assets/img/Kontakt.svg";
import RedirectKnapp from "components/knapper/Redirect";
import TelefonnummerHosNav from "pages/forside/sections/4-personinfo/2-kontaktinfo/subsections/TelefonnummerHosNav";
import MedPersonInfo from "store/providers/PersonInfo";
import Spinner from "components/spinner/Spinner";
import Error, { HTTPError } from "components/error/Error";

interface Routes {
  tjeneste?: string;
  redirectUrl?: string;
}

type Props = {
  redirectUrlProp?: string | null;
};

const EndreAlleOpplysninger = ({ redirectUrlProp }: Props) => {
  const { tjeneste, redirectUrl } = useParams<Routes>();
  const url = redirectUrlProp || redirectUrl;

  console.log("redirecting to", url);

  return (
    <div className="endreOpplysninger__page">
      <div className="endreOpplysninger__container pagecontent">
        {tjeneste && url && (
          <RedirectKnapp tjeneste={tjeneste} redirectUrl={url} />
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
                    <TelefonnummerHosNav tlfnr={personalia.tlfnr} />
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
