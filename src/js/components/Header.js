import React, { Component } from 'react';
import Snakkeboble from 'nav-frontend-snakkeboble';
import pc from '../../assets/img/pc.png';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1 className="header-text">Dine personopplysninger</h1>
        <Snakkeboble
          pilHoyre
        >
          Heisann sveisann
        </Snakkeboble>
        <img src={pc} className="header-pc-icon" alt="Pc" />
      </div>
    );
  }
}

export default Header;
