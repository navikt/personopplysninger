/* eslint-disable */

import React, { Component } from "react";
import Box from "../../../components/box/Box";
import Kilde from "../../../components/kilde/Kilde";
import kvinne from "../../../assets/img/kvinne.svg";
import mann from "../../../assets/img/mann.png";
import ListElement from "../../../components/listelement/ListElement";
import { Personalia as PersonaliaType } from "../../../types/personalia";

interface Props {
  personalia: PersonaliaType;
}

class Personalia extends Component<Props> {
  render() {
    const {
      personident,
      fornavn,
      etternavn,
      kontonr,
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

    const formattertKontonr =
      kontonr && kontonr.length === 11
        ? kontonr.replace(/^(.{4})(.{2})(.*)$/, "$1 $2 $3")
        : kontonr;

    const formattertPersonident =
      personident && personident.verdi.length === 11
        ? {
            ...personident,
            verdi: personident.verdi.replace(/^(.{6})(.*)$/, "$1 $2")
          }
        : personident;

    return (
      <Box
        id="personalia"
        header="Personalia"
        icon={kjoenn === "Mann" ? mann : kvinne}
        infoType="personalia"
      >
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
        <Kilde
          tekst="personalia.source"
          lenkeTekst="personalia.link.folkeregisteret"
          href="https://www.skatteetaten.no/person/folkeregister/"
        />
        <hr className="box__linje-bred" />
        <ul className="list-column-2">
          <ListElement
            titleId="personalia.account_no"
            content={formattertKontonr}
          />
        </ul>
      </Box>
    );
  }
}

export default Personalia;
