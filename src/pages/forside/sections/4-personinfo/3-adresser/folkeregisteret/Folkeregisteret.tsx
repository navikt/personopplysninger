import React from "react";
import BoAdresse from "./BoAdresse";
import PostAdresse from "./PostAdresse";
import Kilde from "../../../../../../components/kilde/Kilde";
import eksternLenkeIkon from "../../../../../../assets/img/Link.svg";
import { Adresser } from "../../../../../../types/adresser";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

interface Props {
  adresser: Adresser;
}

const Folkeregisteret = (props: Props) => (
  <div>
    {(props.adresser.boadresse || props.adresser.postadresse) && (
      <div className="underseksjon__header">
        <Undertittel>
          <FormattedMessage id="adresse.overskrift" />
        </Undertittel>
      </div>
    )}
    {props.adresser.boadresse && (
      <BoAdresse boadresse={props.adresser.boadresse} />
    )}
    {props.adresser.boadresse && props.adresser.postadresse && (
      <div className="adresse__divider" />
    )}
    {props.adresser.postadresse && (
      <PostAdresse postadresse={props.adresser.postadresse} />
    )}
    {(props.adresser.boadresse || props.adresser.postadresse) && (
      <Kilde
        kilde="personalia.source.folkeregisteret"
        lenke="https://www.skatteetaten.no/person/folkeregister/"
        lenkeTekst="personalia.link.folkeregisteret"
        lenkeType={"EKSTERN"}
        ikon={eksternLenkeIkon}
      />
    )}
  </div>
);

export default Folkeregisteret;
