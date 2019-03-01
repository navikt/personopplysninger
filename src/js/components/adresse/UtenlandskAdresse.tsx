import React from "react";
import PropTypes from "prop-types";
import { intlShape, injectIntl } from "react-intl";
import Box from "../Box";
import ListElement from "../ListElement";
import { mergeAddress } from "../../utils/text";

const UtenlandskAdresse = (props: any) => {
  const { adresse1, adresse2, adresse3, land, intl } = props;
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <Box
      header={intl.formatMessage({ id: "adresse.utenlandskadresse" })}
      id="utenlandsk_adresse"
    >
      <div className="address-box">
        <ul className="list-column-2">
          {adresse ? (
            <ListElement titleId="adresse.adresse" content={adresse} />
          ) : null}
          {land ? <ListElement titleId="adresse.land" content={land} /> : null}
        </ul>
      </div>
    </Box>
  );
};

UtenlandskAdresse.propTypes = {
  intl: intlShape.isRequired,
  adresse1: PropTypes.string,
  adresse2: PropTypes.string,
  adresse3: PropTypes.string,
  land: PropTypes.string
};

UtenlandskAdresse.defaultProps = {
  adresse1: "",
  adresse2: "",
  adresse3: "",
  land: ""
};

export default injectIntl(UtenlandskAdresse);
