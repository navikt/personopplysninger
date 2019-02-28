import React from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import Box from "js/components/Box";
import ListElement from "../ListElement";
import { mergeAddress } from "../../utils/text";

const TilleggsAdresse = props => {
  const { adresse1, adresse2, adresse3, postnummer, poststed, intl } = props;
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <Box header={intl.formatMessage({ id: "adresse.tilleggsadresse"})} id="tilleggsadresse">
      <div className="address-box">
        <ul className="list-column-3">
          {adresse ? (
            <ListElement titleId="adresse.adresse" content={adresse} />
          ) : null}
          {postnummer ? (
            <ListElement titleId="adresse.postnummer" content={postnummer} />
          ) : null}
          {poststed ? (
            <ListElement titleId="adresse.poststed" content={poststed} />
          ) : null}
        </ul>
      </div>
    </Box>
  );
};

TilleggsAdresse.propTypes = {
  intl: intlShape.isRequired,
  adresse1: PropTypes.string,
  adresse2: PropTypes.string,
  adresse3: PropTypes.string,
  poststed: PropTypes.string,
  postnummer: PropTypes.string
};

TilleggsAdresse.defaultProps = {
  adresse1: "",
  adresse2: "",
  adresse3: "",
  poststed: "",
  postnummer: ""
};

export default injectIntl(TilleggsAdresse);
