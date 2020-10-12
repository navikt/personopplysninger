import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import ListElement from "components/listelement/ListElement";
import { KontaktInfo } from "types/kontaktInfo";
import Kilde from "components/kilde/Kilde";
import eksternLenkeIkon from "assets/img/Link.svg";
import { useStore } from "../../../../../../../store/Context";

interface Props {
  info: KontaktInfo;
}

const KontaktInformasjon = (props: Props) => {
  const { mobiltelefonnummer, epostadresse, kanVarsles } = props.info;
  const [{ locale }] = useStore();
  return mobiltelefonnummer || epostadresse || kanVarsles ? (
    <>
      <div className="underseksjon__beskrivelse">
        <Normaltekst>
          {kanVarsles ? (
            <FormattedMessage
              id="personalia.dkif.kanVarsles"
              values={{
                b: (text: string) => <b>{text}</b>,
              }}
            />
          ) : (
            <FormattedMessage id="personalia.dkif.kanIkkeVarsles" />
          )}
        </Normaltekst>
      </div>
      <ul className="list-column-2">
        <ListElement titleId="personalia.tlfnr" content={mobiltelefonnummer} />
        <ListElement titleId="personalia.email" content={epostadresse} />
      </ul>
      <Kilde
        kilde="personalia.source.dkif"
        lenke={`https://brukerprofil.difi.no/minprofil${
          locale === "en" ? "?locale=en" : ""
        }`}
        lenkeTekst="personalia.link.dkif.endre"
        lenkeType={"EKSTERN"}
        ikon={eksternLenkeIkon}
      />
    </>
  ) : (
    <>
      <div className="underseksjon__beskrivelse">
        <FormattedMessage
          id={"personalia.dkif.ingenData"}
          values={{
            b: (text: string) => <b>{text}</b>,
          }}
        />
      </div>
      <Kilde
        kilde="personalia.source.dkif"
        lenke="https://brukerprofil.difi.no/minprofil"
        lenkeTekst="personalia.link.dkif.leggtil"
        lenkeType={"EKSTERN"}
        ikon={eksternLenkeIkon}
      />
    </>
  );
};

export default KontaktInformasjon;
