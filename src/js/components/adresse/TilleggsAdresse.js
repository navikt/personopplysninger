import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "js/components/Box";
import ListElement from "../ListElement";

class TilleggsAdresse extends Component {
  render() {
    const { adresse1, adresse2, adresse3, postnummer, poststed } = this.props;
    const adresse = `${adresse1 || ""}${adresse2 || ""}${adresse3 || ""}`;
    return (
      <Box header="Tilleggsadresse">
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
  }
}

TilleggsAdresse.propTypes = {
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

export default TilleggsAdresse;
