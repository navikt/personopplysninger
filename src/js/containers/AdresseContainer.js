import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'less/index.less';
import BoAdresse from '../components/adresse/BoAdresse';
import PostAdresse from '../components/adresse/PostAdresse';
import UtenlandskAdresse from '../components/adresse/UtenlandskAdresse';

class AdresseContainer extends Component {
  render() {
    const { adresseInfo } = this.props;
    return (
      <div>
        <BoAdresse
          adresse={adresseInfo.boadresse.adresse}
          postnummer={adresseInfo.boadresse.postnummer}
          kilde={adresseInfo.boadresse.kilde}
          poststed={adresseInfo.boadresse.poststed}
          kommune={adresseInfo.boadresse.kommune}
          veiadresse={adresseInfo.boadresse.veiadresse}
        />
        {adresseInfo.postadresse ?
          <PostAdresse
            adresse1={adresseInfo.postadresse.adresse1}
            adresse2={adresseInfo.postadresse.adresse2}
            adresse3={adresseInfo.postadresse.adresse3}
            datoFraOgMed={adresseInfo.postadresse.datoFraOgMed}
            kilde={adresseInfo.postadresse.kilde}
            land={adresseInfo.postadresse.land}
            postnummer={adresseInfo.postadresse.postnummer}
          /> : null}
        {adresseInfo.utenlandskAdresse ?
          <UtenlandskAdresse
            adresse1={adresseInfo.utenlandskAdresse.adresse1}
            adresse2={adresseInfo.utenlandskAdresse.adresse2}
            adresse3={adresseInfo.utenlandskAdresse.adresse3}
            kilde={adresseInfo.utenlandskAdresse.kilde}
          /> : null}
      </div>
    );
  }
}

AdresseContainer.propTypes = {
  adresseInfo: PropTypes.shape({}).isRequired,
};

export default AdresseContainer;
