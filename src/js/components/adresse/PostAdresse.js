import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "js/components/Box";
import ListElement from "../ListElement";
import { slaSammenAdresse } from "../../utils/adresse";

class PostAdresse extends Component {
  render() {
    const { adresse1, adresse2, adresse3, postnummer, land } = this.props;
    const adresse = slaSammenAdresse(adresse1, adresse2, adresse3);
    return (
      <Box smallMargin>
        <div className="address-box">
          <h3 className="address-type">Postadresse</h3>
          <ul className="list-column-2">
            {adresse ? (
              <ListElement titleId="adresse.adresse" content={adresse} />
            ) : null}
            {postnummer ? (
              <ListElement titleId="adresse.postnummer" content={postnummer} />
            ) : null}
            {land ? (
              <ListElement titleId="adresse.land" content={land} />
            ) : null}
          </ul>
        </div>
      </Box>
    );
  }
}

PostAdresse.propTypes = {
  adresse1: PropTypes.string,
  adresse2: PropTypes.string,
  adresse3: PropTypes.string,
  land: PropTypes.string,
  postnummer: PropTypes.string
};

PostAdresse.defaultProps = {
  adresse1: "",
  adresse2: "",
  adresse3: "",
  land: "",
  postnummer: ""
};

export default PostAdresse;
