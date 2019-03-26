import React from "react";
import PropTypes from "prop-types";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { Undertekst } from "nav-frontend-typografi";
import BoAdresse from "../../../components/adresse/BoAdresse";
import PostAdresse from "../../../components/adresse/PostAdresse";
import UtenlandskAdresse from "../../../components/adresse/UtenlandskAdresse";
import MidlertidigAdresse from "../../../components/adresse/MidlertidigAdresse";
import { Adresser } from "../../../types/adresser";
import Box from "../../../components/box/Box";
import hus from "../../../assets/img/hus.svg";

interface Props {
  adresser: Adresser;
}

const AdresseContainer = (props: Props & InjectedIntlProps) => {
  const { adresser, intl } = props;
  return (
    <Box
      id="adresse"
      header={intl.formatMessage({ id: "adresse.adresser" })}
      icon={hus}
      infoType="adresse"
    >
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
      <div className="box-footer">
        <Undertekst>
          <FormattedMessage id="adresse.source" />
        </Undertekst>
      </div>
    </Box>
  );
};

AdresseContainer.propTypes = {
  adresser: PropTypes.shape({}).isRequired
};

export default injectIntl(AdresseContainer);
