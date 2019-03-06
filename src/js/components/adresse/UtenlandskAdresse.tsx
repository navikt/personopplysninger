import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { UtenlandskAdresse as UtenlandskAdresseType } from "../../../types/adresser/utenlandskadresse";
import Box from "../Box";
import ListElement from "../ListElement";
import { mergeAddress } from "../../utils/text";

type Props = { utenlandskadresse: UtenlandskAdresseType } & InjectedIntlProps;
const UtenlandskAdresse = (props: Props) => {
  const { intl } = props;
  const { adresse1, adresse2, adresse3, land } = props.utenlandskadresse;
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <Box
      header={intl.formatMessage({ id: "adresse.utenlandskadresse" })}
      id="utenlandsk_adresse"
    >
      <div className="address-box">
        <ul className="list-column-2">
          {adresse && (
            <ListElement titleId="adresse.adresse" content={adresse} />
          )}
          {land && <ListElement titleId="adresse.land" content={land} />}
        </ul>
      </div>
    </Box>
  );
};

export default injectIntl(UtenlandskAdresse);
