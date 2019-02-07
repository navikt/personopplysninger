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
    const numberOfElements = [this.props.adresse,
      this.props.postnummer,
      this.props.poststed,
      this.props.veiadresse.bolignummer,
      this.props.kommune,
      this.props.adressetillegg,
      formattedDate].filter(Boolean).length;

    const renderAdresse = () => {
      if (this.props.adresse && !this.props.adressetillegg) {
        return (<ListElement
          titleId="adresse.adresse"
          content={this.props.adresse}
        />);
      } else if (!this.props.adresse && this.props.adressetillegg) {
        return (<ListElement
          titleId="adresse.adresse"
          content={this.props.adressetillegg}
        />);
      } else if (this.props.adresse && this.props.adressetillegg) {
        return (<ListElement
          titleId="adresse.adresse"
          content={`${this.props.adresse}, ${this.props.adressetillegg}`}
        />);
      }

      return null;
    };

    const numberOfColumns = [4, 5].includes(numberOfElements) ? 2 : 3;

    return (
      <Box
        header="Adresse"
        icon={hus}
        infoType="adresse"
        smallMargin
      >
        <div className="address-box">
          <h3 className="address-type">Bostedsadresse</h3>
          <ul className={`list-column-${numberOfColumns} address-columns`}>
            {renderAdresse()}
            {this.props.postnummer ? <ListElement
              titleId="adresse.postnummer"
              content={this.props.postnummer}
            /> : null}
            {this.props.poststed ? <ListElement
              titleId="adresse.poststed"
              content={this.props.poststed}
            /> : null}
            {this.props.veiadresse.bolignummer ? <ListElement
              titleId="adresse.bolignummer"
              content={this.props.veiadresse.bolignummer}
            /> : null}
            {this.props.kommune ? <ListElement
              titleId="adresse.kommune"
              content={this.props.kommune}
            /> : null}
            {formattedDate ? <ListElement
              titleId="adresse.dato"
              content={formattedDate}
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
  adressetillegg: PropTypes.string,
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
  adressetillegg: '',
  postnummer: '',
  poststed: '',
  kommune: '',
  datoFraOgMed: '',
};

export default BoAdresse;
