import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "js/components/Box";
import ListElement from "../ListElement";

class UtenlandskAdresse extends Component {
  render() {
    const { adresse1, adresse2, adresse3, land } = this.props;
    const adresse = `${adresse1 || ""}${adresse2 || ""}${adresse3 || ""}`;
    return (
      <Box>
        <div className="address-box">
          <h3 className="address-type">Utenlandsk adresse</h3>
          <ul className="list-column-2">
            {adresse ? (
              <ListElement titleId="adresse.adresse" content={adresse} />
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
