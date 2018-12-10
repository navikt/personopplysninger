import React, { Component } from 'react';
import pc from '../../assets/img/pc.png';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="header-text">Dine personopplysninger</h1>
        <div className="header-content">
          <div className="snakkeboble-wrapper">
            <div className="snakkeboble">
              Hei Kari, her kan du se og laste ned informasjon NAV
              har knyttett til deg her.  Vi har samlet  informasjonen
              vi har tilgjengelig knyttet til deg på denne siden.
              Les om personvern i Arbeids- og velferdsetaten her.
            </div>
            <div className="snakkeboble-edge" />
          </div>
          <img src={pc} className="header-pc-icon" alt="Pc" />
        </div>
      </div>
    );
  }
}

export default Header;
