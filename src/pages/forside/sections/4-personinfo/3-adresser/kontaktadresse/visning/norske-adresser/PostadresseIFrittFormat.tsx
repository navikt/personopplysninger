import React from "react";
import GateAdresse from "../../../komponenter/GateAdresse";
import Postnummer from "../../../komponenter/Postnummer";
import { PostadresseIFrittFormat as PostadresseIFrittFormatType } from "types/adresser/kontaktadresse";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";
import moment from "moment";

const PostadresseIFrittFormat = (props: PostadresseIFrittFormatType) => {
  const { adresselinje1, adresselinje2, adresselinje3 } = props;
  const { gyldigTilOgMed, postnummer, poststed } = props;
  return (
    <>
      <GateAdresse
        adresse1={adresselinje1}
        adresse2={adresselinje2}
        adresse3={adresselinje3}
      />
      <Postnummer postnummer={postnummer} poststed={poststed} />
      <div className="adresse__divider" />
      <AlertStripeInfo>
        <FormattedMessage
          id="adresse.kontaktadresse.alert"
          values={{ dato: moment(gyldigTilOgMed).format("LL") }}
        />
      </AlertStripeInfo>
    </>
  );
};

export default PostadresseIFrittFormat;
