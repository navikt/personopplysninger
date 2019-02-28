import React from "react";
import PropTypes from "prop-types";
import { Systemtittel } from "nav-frontend-typografi";
import Box from "js/components/Box";
import ListElement from "../ListElement";
import { mergeAddress } from "../../utils/text";

const UtenlandskAdresse = props => {
  const { adresse1, adresse2, adresse3, land } = props;
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <Box id="utenlandskadresse">
      <div className="address-box">
        <Systemtittel>Utenlandsk adresse</Systemtittel>
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

export default UtenlandskAdresse;
