import React, { Component } from 'react';
import Alternativ from './Alternativ';
import alternatives from '../static/alternatives';

class AlternativListe extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="BoxContainer">
          <div className="AlternativesBox box-bottom-margin">
            <h1>Andre alternativer</h1>
            <div className="icon-box-margin">
              {alternatives.map(alternative =>
                (<Alternativ
                  key={alternative.id}
                  description={alternative.description}
                  content={alternative.content}
                />))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AlternativListe;
