import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import Box from "../Box";
import ListElement from "../ListElement";
import { Tilleggsadresse } from "../../../types/adresser/tilleggsadresse";
import { mergeAddress } from "../../utils/text";

type Props = { tilleggsadresse: Tilleggsadresse } & InjectedIntlProps;
const MidlertidigAdresse = (props: Props) => {
  const { intl } = props;
  const {
    adresse1,
    adresse2,
    adresse3,
    postnummer,
    poststed
  } = props.tilleggsadresse;
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <Box
      header={intl.formatMessage({ id: "adresse.midlertidigadresse" })}
      id="tilleggsadresse"
    >
      <div className="address-box">
        <ul className="list-column-3">
          {adresse && (
            <ListElement titleId="adresse.adresse" content={adresse} />
          )}
          {postnummer && (
            <ListElement titleId="adresse.postnummer" content={postnummer} />
          )}
          {poststed && (
            <ListElement titleId="adresse.poststed" content={poststed} />
          )}
        </ul>
      </div>
    </Box>
  );
};

export default injectIntl(MidlertidigAdresse);
