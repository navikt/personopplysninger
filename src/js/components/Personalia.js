/* eslint-disable */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "js/components/Box";
import { FormattedMessage } from "react-intl";
import kvinne from "../../assets/img/kvinne.png";
import mann from "../../assets/img/rsz_mann.png";
import ListElement from "./ListElement";

class Personalia extends Component {
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
      personident.type === "DNR" ? "personalia.dnr" : "personalia.fnr";

    const fornavnHeader =
      fornavn.indexOf(" ") === -1
        ? "personalia.first_name"
        : "personalia.first_and_middle_name";

    return (
      <Box
        header="Personalia"
        icon={this.props.kjoenn === "Mann" ? mann : kvinne}
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
              content={tstatsborgerskap}
            />
          )}
          {foedested && (
            <ListElement titleId="personalia.birthplace" content={foedested} />
          )}
          {sivilstand && (
            <ListElement
              titleId="personalia.civil_status"
              content={tsivilstand}
            />
          )}
          {kjoenn && (
            <ListElement titleId="personalia.gender" content={kjoenn} />
          )}
        </ul>
        <div className="box-footer">
          <FormattedMessage id="personalia.source" />
        </div>
      </Box>
    );
  }
}

Personalia.propTypes = {
  // datakilder: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  epostadr: PropTypes.string,
  etternavn: PropTypes.string,
  personident: PropTypes.shape({
    verdi: PropTypes.string,
    type: PropTypes.string
  }),
  foedested: PropTypes.string,
  fornavn: PropTypes.string,
  kjoenn: PropTypes.string,
  kontonr: PropTypes.string,
  sivilstand: PropTypes.string,
  spraak: PropTypes.string,
  statsborgerskap: PropTypes.string,
  tlfnr: PropTypes.shape({
    jobb: PropTypes.string,
    mobil: PropTypes.string,
    privat: PropTypes.string,
    datakilder: PropTypes.arrayOf(PropTypes.shape({}))
  })
};

Personalia.defaultProps = {
  fornavn: "",
  etternavn: "",
  personident: {
    verdi: "",
    type: ""
  },
  kontonr: "",
  tlfnr: {
    jobb: "",
    mobil: "",
    privat: ""
    // datakilder: [{}],
  },
  spraak: "",
  epostadr: "",
  statsborgerskap: "",
  foedested: "",
  sivilstand: "",
  kjoenn: ""
  // datakilder: [{}],
};

export default Personalia;
