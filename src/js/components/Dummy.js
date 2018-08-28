import React, { Component } from 'react';
import Box from 'js/components/Box';

const f = (x, y) => (x * y) / 2;

class Dummmy extends Component {
  method() {
    // hello
    this.hello = {};
    f();
  }
  render() {
    return (
      <Box header="Adresse">
        <h3>Adresse</h3>
      </Box>
    );
  }
}

export default Dummmy;
