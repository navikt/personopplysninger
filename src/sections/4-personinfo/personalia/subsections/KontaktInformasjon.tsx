import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedHTMLMessage } from "react-intl";
import ListElement from "../../../../components/listelement/ListElement";
import { KontaktInfo } from "../../../../types/kontaktInfo";

interface Props {
  info: KontaktInfo;
}

const KontaktInformasjon = (props: Props) => {
  const { mobiltelefonnummer, epostadresse, kanVarsles } = props.info;
  return (
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
        <ListElement
          titleId="personalia.account_no"
          content={mobiltelefonnummer}
        />
        <ListElement titleId="personalia.account_no" content={epostadresse} />
      </ul>
    </>
  );
};

export default KontaktInformasjon;
