import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import Box from "../Box";
import ListElement from "../ListElement";
import { Postadresse } from "../../../types/adresser/postadresse";
import { mergeAddress } from "../../utils/text";

type Props = { postadresse: Postadresse } & InjectedIntlProps;
const PostAdresse = (props: Props) => {
  const { intl } = props;
  const {
    adresse1,
    adresse2,
    adresse3,
    postnummer,
    poststed,
    land
  } = props.postadresse;
  const adresse = mergeAddress(adresse1, adresse2, adresse3);
  return (
    <Box
      header={intl.formatMessage({ id: "adresse.postadresse" })}
      id="postadresse"
    >
      <div className="address-box">
        <ul className="list-column-2">
          {adresse && (
            <ListElement titleId="adresse.adresse" content={adresse} />
          )}
          {postnummer && (
            <ListElement titleId="adresse.postnummer" content={postnummer} />
          )}
          {land && <ListElement titleId="adresse.land" content={land} />}
          {poststed && (
            <ListElement titleId="adresse.poststed" content={poststed} />
          )}
        </ul>
      </div>
    </Box>
  );
};

export default injectIntl(PostAdresse);
