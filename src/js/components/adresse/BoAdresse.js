import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import 'moment/min/locales';
import { FormattedMessage } from 'react-intl';
import Box from 'js/components/Box';
import hus from '../../../assets/img/hus.png';
import ListElement from '../ListElement';

moment.locale('nb');

class BoAdresse extends Component {
  render() {
    const formattedDate = this.props.datoFraOgMed ? moment(this.props.datoFraOgMed).format('L') : '';
    return (
      <Box
        header="Adresse"
        icon={hus}
        infoType="adresse"
        smallMargin
      >
        <div className="address-box">
          <h3 className="address-type">Bostedsadresse</h3>
          <ul className="list-column-3">
            {this.props.adresse ? <ListElement
              titleId="adresse.gate"
              content={this.props.adresse}
            /> : null}
            {this.props.postnummer ? <ListElement
              titleId="adresse.postnummer"
              content={this.props.postnummer}
            /> : null}
            {this.props.poststed ? <ListElement
              titleId="adresse.poststed"
              content={this.props.poststed}
            /> : null}
            {formattedDate ? <ListElement
              titleId="adresse.dato"
              content={formattedDate}
            /> : null}
            {this.props.kommune ? <ListElement
              titleId="adresse.kommune"
              content={this.props.kommune}
            /> : null}
            {this.props.veiadresse.bolignummer ? <ListElement
              titleId="adresse.bolignummer"
              content={this.props.veiadresse.bolignummer}
            /> : null}
          </ul>
          <div className="box-footer">
            <FormattedMessage
              id="adresse.source"
            />
          </div>
        </div>
      </Box>
    );
  }
}

BoAdresse.propTypes = {
  adresse: PropTypes.string,
  postnummer: PropTypes.string,
  poststed: PropTypes.string,
  datoFraOgMed: PropTypes.string,
  kommune: PropTypes.string,
  veiadresse: PropTypes.shape({
    bokstav: PropTypes.string,
    bolignummer: PropTypes.string,
    gatekode: PropTypes.string,
    husnummer: PropTypes.string,
  }).isRequired,
};

BoAdresse.defaultProps = {
  adresse: '',
  postnummer: '',
  poststed: '',
  kommune: '',
  datoFraOgMed: '',
};

export default BoAdresse;
