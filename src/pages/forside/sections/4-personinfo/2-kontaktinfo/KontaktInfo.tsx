import React from "react";
import Box from "components/box/Box";
import kontaktIkon from "assets/img/Kontakt.svg";
import TelefonnummerHosNav from "./subsections/telefonnummer/TelefonnummerHosNav";
import DKIF from "./subsections/kontakt-og-reservasjonsregisteret/DKIF-Fetch";
import { Tlfnr } from "types/personalia";
import { Alert } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
interface Props {
  tlfnr?: Tlfnr;
}

const KontaktInfo = (props: Props) => {
  return (
    <Box
      id="kontaktinformasjon"
      tittel="kontaktinfo.tittel"
      beskrivelse="kontaktinformasjon-kilde"
      icon={kontaktIkon}
      visAnkerlenke={true}
    >
      {props.tlfnr &&
      (props.tlfnr.telefonHoved || props.tlfnr.telefonAlternativ) ? (
        <>
          <div className="telefonnummer">
            <TelefonnummerHosNav tlfnr={props.tlfnr} />
          </div>
          <div className="telefonnummer">
            <DKIF />
          </div>
        </>
      ) : (
        <>
          <div className="telefonnummer">
            <DKIF />
          </div>
          <div className="telefonnummer">
            <TelefonnummerHosNav tlfnr={props.tlfnr} />
          </div>
        </>
      )}

      <div className="arbeidsforhold__disclaimer">
        <Alert variant="info">
          <FormattedMessage
            id="kontaktogreservasjonsregister-disclaimer"
            values={{
              br: (text) => (
                <>
                  <br />
                  {text}
                </>
              ),
            }}
          />
        </Alert>
      </div>
    </Box>
  );
};

export default KontaktInfo;
