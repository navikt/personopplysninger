import React from "react";
import Box from "components/box/Box";
import { ListeMedArbeidsforhold, AFListeOnClick } from "@navikt/arbeidsforhold";
import arbeidsforholdIkon from "assets/img/Arbeidsforhold.svg";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { basePath } from "App";
import Kilde from "components/kilde/Kilde";
import { useStore } from "../../../../store/Context";
import { Locale } from "../../../../store/Store";
import { Alert } from "@navikt/ds-react";

const miljo = process.env.REACT_APP_MILJO as "LOCAL" | "DEV" | "PROD";

const Arbeidsforhold = () => {
  const { locale } = useIntl();
  const [{ personInfo }] = useStore();

  const printName =
    personInfo.status === "RESULT"
      ? `${personInfo.data.personalia?.fornavn} ${personInfo.data.personalia?.etternavn}`
      : ``;

  const printSSN =
    personInfo.status === "RESULT"
      ? `${personInfo.data.personalia?.personident?.verdi}`
      : ``;

  const onClick = {
    type: "REACT_ROUTER_LENKE",
    Component: Link,
    to: `${basePath}/${locale}/arbeidsforhold/{id}`,
  } as AFListeOnClick;

  return (
    <Box
      id="arbeidsforhold"
      tittel="arbeidsforhold.tittel"
      beskrivelse="arbeidsforhold.beskrivelse"
      icon={arbeidsforholdIkon}
      visAnkerlenke={true}
    >
      <div className="arbeidsforhold">
        <ListeMedArbeidsforhold
          miljo={miljo}
          locale={locale as Locale}
          onClick={onClick}
          printActivated={true}
          printName={printName}
          printSSN={printSSN}
        />
      </div>
      <div className="arbeidsforhold__disclaimer">
        <Alert variant="info">
          <FormattedMessage
            id="arbeidsforhold.disclaimer"
            values={{
              br: (text: String) => (
                <>
                  <br />
                  {text}
                </>
              ),
            }}
          />
        </Alert>
      </div>
      <Kilde kilde="arbeidsforhold.kilde" lenkeType="INGEN" />
    </Box>
  );
};
export default Arbeidsforhold;
