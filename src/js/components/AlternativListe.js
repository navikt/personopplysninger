import React, { Component } from 'react';
import alternatives from '../static/alternatives';

class Alternativer extends Component {
  render() {
    console.log('alternativer');
    console.log(alternatives);

    return (
      <React.Fragment>
        {alternatives.map(alternative => <div>{alternative.description}</div>)}
      </React.Fragment>
    );
  }
}

export default Alternativer;
