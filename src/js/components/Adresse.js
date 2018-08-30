import React, { Component } from 'react';
import Box from 'js/components/Box';
import woman from '../../assets/img/woman.png';

class Adresse extends Component {
  render() {
    return (
      <Box header="Adresse" icon={woman}>
        <h3 className="address-type">Bostedsadresse</h3>
        <ul className="address-row">
          <li className="address-col">
            <span className="title">Gate</span>
            <span className="content">Vardeveien 7</span>
          </li>
          <li className="address-col">
            <span className="title">Postnummer</span>
            <span className="content">5002</span>
          </li>
          <li className="address-col">
            <span className="title">Poststed</span>
            <span className="content">Kristiansand</span>
          </li>
        </ul>
        <div className="box-footer">
          Kilde: Folkeregisteret
        </div>
      </Box>
    );
  }
}

export default Adresse;
