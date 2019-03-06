import React from "react";
import PropTypes from "prop-types";
import BoAdresse from "../components/adresse/BoAdresse";
import PostAdresse from "../components/adresse/PostAdresse";
import UtenlandskAdresse from "../components/adresse/UtenlandskAdresse";
import MidlertidigAdresse from "../components/adresse/MidlertidigAdresse";
import { Adresser } from "../../types/adresser";
import "less/index.less";

interface Props {
  adresser: Adresser;
}

const AdresseContainer = (props: Props) => {
  const { adresser } = props;
  return (
    <div>
      {adresser.boadresse && <BoAdresse boadresse={adresser.boadresse} />}
      {adresser.postadresse && (
        <PostAdresse postadresse={adresser.postadresse} />
      )}
      {adresser.tilleggsadresse && (
        <MidlertidigAdresse tilleggsadresse={adresser.tilleggsadresse} />
      )}
      {adresser.utenlandskAdresse && (
        <UtenlandskAdresse utenlandskadresse={adresser.utenlandskAdresse} />
      )}
    </div>
  );
};

AdresseContainer.propTypes = {
  adresser: PropTypes.shape({}).isRequired
};

export default AdresseContainer;
