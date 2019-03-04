/* eslint-disable */

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Undertekst } from "nav-frontend-typografi";
import Box from "./Box";
import kvinne from "../../assets/img/kvinne.svg";
import mann from "../../assets/img/mann.png";
import ListElement from "./ListElement";
import { Personalia as PersonaliaType } from "../../types/personalia";

class Personalia extends Component<PersonaliaType> {
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
    } = this.props;

    const personidentHeader =
      personident && personident.type === "DNR"
        ? "personalia.dnr"
        : "personalia.fnr";

    const fornavnHeader =
      fornavn && fornavn.indexOf(" ") === -1
        ? "personalia.first_name"
        : "personalia.first_and_middle_name";

    return (
      <Box
        id="personalia"
        header="Personalia"
        icon={kjoenn === "Mann" ? mann : kvinne}
        infoType="personalia"
      >
        <ul className="list-column-2">
          {fornavn && <ListElement titleId={fornavnHeader} content={fornavn} />}
          {etternavn && (
            <ListElement
              classNameContent="capitalize"
              titleId="personalia.surname"
              content={etternavn}
            />
          )}
          {personident && personident.verdi && (
            <ListElement
              titleId={personidentHeader}
              content={personident.verdi}
            />
          )}
          {kontonr && (
            <ListElement titleId="personalia.account_no" content={kontonr} />
          )}
          {spraak && (
            <ListElement titleId="personalia.language" content={spraak} />
          )}
          {statsborgerskap && (
            <ListElement
              titleId="personalia.citizenship"
              content={statsborgerskap}
            />
          )}
          {foedested && (
            <ListElement titleId="personalia.birthplace" content={foedested} />
          )}
          {sivilstand && (
            <ListElement
              titleId="personalia.civil_status"
              content={sivilstand}
            />
          )}
          {kjoenn && (
            <ListElement titleId="personalia.gender" content={kjoenn} />
          )}
        </ul>
        <div className="box-footer">
          <Undertekst>
            <FormattedMessage id="personalia.source" />
          </Undertekst>
        </div>
      </Box>
    );
  }
}

export default Personalia;
