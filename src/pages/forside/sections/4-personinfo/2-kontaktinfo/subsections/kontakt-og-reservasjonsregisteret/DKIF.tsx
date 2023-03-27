import React from "react";
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
  const { mobiltelefonnummer, epostadresse, kanVarsles, spraak } = props.info;
  const [{ locale }] = useStore();
  return mobiltelefonnummer || epostadresse || kanVarsles ? (
    <>
      <dl className="list">
        <ListElement titleId="personalia.tlfnr" content={mobiltelefonnummer} />
      </dl>
      <dl className="list">
        <ListElement titleId="personalia.email" content={epostadresse} />
      </dl>
      <dl className="list">
        <ListElement titleId="personalia.spraak" content={spraak} />
      </dl>
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
            b: (text) => <b>{text}</b>,
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
