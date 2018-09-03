import React, { Component } from 'react';
import Box from 'js/components/Box';
import { FormattedMessage } from 'react-intl';
import house from '../../assets/img/house.png';

class Adresse extends Component {
  render() {
    return (
      <Box header="Adresse" icon={house}>
        <div className="address-box">
          <h3 className="address-type">Bostedsadresse</h3>
          <ul className="address-list">
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.gate"
              />
              </span>
              <span className="content">Vardeveien 7</span>
            </li>
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.postnummer"
              />
              </span>
              <span className="content">5002</span>
            </li>
            <li className="address-col">
              <span className="title"><FormattedMessage
                id="adresse.poststed"
              />
              </span>
              <span className="content">Kristiansand</span>
            </li>
          </ul>
          <div className="box-footer">
            Kilde: Folkeregisteret
          </div>
        </div>
      </Box>
    );
  }
}

export default Adresse;
