import React, { Component } from "react";
import Kilde from "../../../../../../components/kilde/Kilde";
import ListElement from "../../../../../../components/listelement/ListElement";
import { Personalia as PersonaliaType } from "../../../../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class Folkeregisteret extends Component<Props> {
  render() {
    const {
      personident,
      fornavn,
      etternavn,
      spraak,
      statsborgerskap,
      foedested,
      sivilstand,
      kjoenn
    } = this.props.personalia;

    const personidentHeader =
      personident && personident.type === "DNR"
        ? "personalia.dnr"
        : "personalia.fnr";

    const fornavnHeader =
      fornavn && fornavn.indexOf(" ") === -1
        ? "personalia.first_name"
        : "personalia.first_and_middle_name";

    const formattertPersonident =
      personident && personident.verdi.length === 11
        ? {
            ...personident,
            verdi: personident.verdi.replace(/^(.{6})(.*)$/, "$1 $2")
          }
        : personident;

    return (
      <>
        <hr className="box__linje-bred" />
        <ul className="list-column-2">
          <ListElement titleId={fornavnHeader} content={fornavn} />
          <ListElement
            className="capitalize"
            titleId="personalia.surname"
            content={etternavn}
          />
          {formattertPersonident && (
            <ListElement
              titleId={personidentHeader}
              content={formattertPersonident.verdi}
            />
          )}
          <ListElement titleId="personalia.language" content={spraak} />
          <ListElement
            titleId="personalia.citizenship"
            content={statsborgerskap}
          />
          <ListElement titleId="personalia.birthplace" content={foedested} />
          <ListElement titleId="personalia.civil_status" content={sivilstand} />
          <ListElement titleId="personalia.gender" content={kjoenn} />
        </ul>
        <hr className="box__linje-bred" />
        <Kilde
          kilde="personalia.source.folkeregisteret"
          lenke="https://www.skatteetaten.no/person/folkeregister/"
          lenkeTekst="personalia.link.folkeregisteret"
          eksternLenke={true}
        />
      </>
    );
  }
}

export default Folkeregisteret;
