import React from "react";
import PropTypes from "prop-types";
import * as moment from "moment";
import "moment/min/locales";
import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import Box from "js/components/Box";
import hus from "../../../assets/img/hus.svg";
import ListElement from "../ListElement";

moment.locale("nb");

const BoAdresse = props => {
  const {
    adresse,
    postnummer,
    poststed,
    veiadresse,
    kommune,
    adressetillegg,
    datoFraOgMed,
    intl
  } = props;

  const formattedDate = datoFraOgMed ? moment(datoFraOgMed).format("L") : "";
  const numberOfElements = [
    adresse,
    postnummer,
    poststed,
    veiadresse.bolignummer,
    kommune,
    adressetillegg,
    formattedDate
  ].filter(Boolean).length;

  const renderAdresse = () => {
    if (adresse && !adressetillegg) {
      return <ListElement titleId="adresse.adresse" content={adresse} />;
    }
    if (!adresse && adressetillegg) {
      return <ListElement titleId="adresse.adresse" content={adressetillegg} />;
    }
    if (adresse && adressetillegg) {
      return (
        <ListElement
          titleId="adresse.adresse"
          content={`${adresse}, ${adressetillegg}`}
        />
      );
    }

    return null;
  };

  const numberOfColumns = [4, 5].includes(numberOfElements) ? 2 : 3;

  return (
    <Box
      id="adresse"
      header={intl.formatMessage({ id: "adresse.bostedsadresse" })}
      icon={hus}
      infoType="adresse"
      smallMargin
    >
      <div className="address-box">
        <ul className={`list-column-${numberOfColumns} address-columns`}>
          {renderAdresse()}
          {postnummer ? (
            <ListElement titleId="adresse.postnummer" content={postnummer} />
          ) : null}
          {poststed ? (
            <ListElement titleId="adresse.poststed" content={poststed} />
          ) : null}
          {veiadresse.bolignummer ? (
            <ListElement
              titleId="adresse.bolignummer"
              content={veiadresse.bolignummer}
            />
          ) : null}
          {kommune ? (
            <ListElement titleId="adresse.kommune" content={kommune} />
          ) : null}
          {formattedDate ? (
            <ListElement titleId="adresse.dato" content={formattedDate} />
          ) : null}
        </ul>
        <div className="box-footer">
          <FormattedMessage id="adresse.source" />
        </div>
      </div>
    </Box>
  );
};

BoAdresse.propTypes = {
  intl: intlShape.isRequired,
  adresse: PropTypes.string,
  adressetillegg: PropTypes.string,
  postnummer: PropTypes.string,
  poststed: PropTypes.string,
  datoFraOgMed: PropTypes.string,
  kommune: PropTypes.string,
  veiadresse: PropTypes.shape({
    bokstav: PropTypes.string,
    bolignummer: PropTypes.string,
    gatekode: PropTypes.string,
    husnummer: PropTypes.string
  }).isRequired
};

BoAdresse.defaultProps = {
  adresse: "",
  adressetillegg: "",
  postnummer: "",
  poststed: "",
  kommune: "",
  datoFraOgMed: ""
};

export default injectIntl(BoAdresse);
