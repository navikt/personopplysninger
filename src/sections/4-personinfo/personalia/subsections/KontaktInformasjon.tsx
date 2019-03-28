import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import ListElement from "../../../../components/listelement/ListElement";
import Message from "../../../../components/message/Message";
import { KontaktInfo } from "../../../../types/kontaktInfo";
import Kilde from "../../../../components/kilde/Kilde";

interface Props {
  info: KontaktInfo;
}

const KontaktInformasjon = (props: Props) => {
  const { mobiltelefonnummer, epostadresse, kanVarsles } = props.info;
  return mobiltelefonnummer || epostadresse || kanVarsles ? (
    <>
      <div className="underseksjon__beskrivelse">
        <Normaltekst>
          {kanVarsles ? (
            <FormattedHTMLMessage id="personalia.dkif.kanVarsles" />
          ) : (
            <FormattedHTMLMessage id="personalia.dkif.kanIkkeVarsles" />
          )}
        </Normaltekst>
      </div>
      <ul className="list-column-2">
        <ListElement titleId="personalia.phone" content={mobiltelefonnummer} />
        <ListElement titleId="personalia.email" content={epostadresse} />
      </ul>
      <Kilde
        kilde="personalia.source.dkif"
        lenke="https://brukerprofil.difi.no/minprofil"
        lenkeTekst="personalia.link.dkif.endre"
      />
    </>
  ) : (
    <>
      <Message messageId="personalia.dkif.ingenData" />
      <Kilde
        kilde="personalia.source.dkif"
        lenke="https://brukerprofil.difi.no/minprofil"
        lenkeTekst="personalia.link.dkif.leggtil"
      />
    </>
  );
};

export default KontaktInformasjon;
