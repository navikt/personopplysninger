import * as React from "react";
import { Element } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import ListElement from "../../../../../../components/listelement/ListElement";

interface Props {
  tittel: string;
  bruksenhetsnummer?: string;
  kommune?: string;
  flyttedatoFormatert?: string;
  gyldigTilOgMedFormatert?: string;
  children: JSX.Element | JSX.Element[];
}

const AdressePanel = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  return (
    <div className="adresse__box">
      <div className="underseksjon__header">
        <Element>
          <FormattedMessage id={props.tittel} />
        </Element>
      </div>
      {props.children}
      {(props.bruksenhetsnummer ||
        props.kommune ||
        props.flyttedatoFormatert ||
        props.gyldigTilOgMedFormatert) && (
        <Lesmerpanel
          className="adresse__lesmer"
          apneTekst={msg({ id: "adresse.bostedsadresse.apneTekst" })}
          lukkTekst={msg({ id: "adresse.bostedsadresse.lukkTekst" })}
        >
          <ul className="list-column-2 address-columns">
            {props.bruksenhetsnummer && (
              <ListElement
                titleId="adresse.bolignummer"
                content={props.bruksenhetsnummer}
              />
            )}
            {props.kommune && (
              <ListElement titleId="adresse.kommune" content={props.kommune} />
            )}
            {props.flyttedatoFormatert && (
              <ListElement
                titleId="adresse.dato"
                content={props.flyttedatoFormatert}
              />
            )}
            {props.gyldigTilOgMedFormatert && (
              <ListElement
                titleId="adresse.dato.gyldigtil"
                content={props.gyldigTilOgMedFormatert}
              />
            )}
          </ul>
        </Lesmerpanel>
      )}
      <div className={"adresse__divider"} />
    </div>
  );
};

export default AdressePanel;
