import React from "react";
import { Undertekst } from "nav-frontend-typografi";
import moment from "moment";
import { FormattedMessage, injectIntl, InjectedIntlProps } from "react-intl";
import Box from "../Box";
import hus from "../../../assets/img/hus.svg";
import ListElement from "../ListElement";
import { Boadresse } from "../../../types/adresser/boadresse";
import "moment/locale/nb";

moment.locale("nb");

type Props = { boadresse: Boadresse } & InjectedIntlProps;
const BoAdresse = (props: Props) => {
  const { intl } = props;
  const {
    adresse,
    postnummer,
    poststed,
    veiadresse,
    kommune,
    adressetillegg,
    datoFraOgMed
  } = props.boadresse;

  const formattedDate = datoFraOgMed ? moment(datoFraOgMed).format("L") : "";
  const numberOfElements = [
    adresse,
    postnummer,
    poststed,
    veiadresse && veiadresse.bolignummer,
    kommune,
    adressetillegg,
    formattedDate
  ].filter(Boolean).length;

  const renderAdresse = () => {
    if (adresse && !adressetillegg) {
      return <ListElement titleId="adresse.adresse" content={adresse} />;
    }
    if (!adresse && adressetillegg) {
      return <ListElement titleId="adresse.adresse" content={adressetillegg} />;
    }
    if (adresse && adressetillegg) {
      return (
        <ListElement
          titleId="adresse.adresse"
          content={`${adresse}, ${adressetillegg}`}
        />
      );
    }

    return null;
  };

  const numberOfColumns = [4, 5].includes(numberOfElements) ? 2 : 3;

  return (
    <Box
      id="adresse"
      header={intl.formatMessage({ id: "adresse.bostedsadresse" })}
      icon={hus}
      infoType="adresse"
    >
      <div className="address-box">
        <ul className={`list-column-${numberOfColumns} address-columns`}>
          {renderAdresse()}
          {postnummer && (
            <ListElement titleId="adresse.postnummer" content={postnummer} />
          )}
          {poststed && (
            <ListElement titleId="adresse.poststed" content={poststed} />
          )}
          {veiadresse && veiadresse.bolignummer && (
            <ListElement
              titleId="adresse.bolignummer"
              content={veiadresse.bolignummer}
            />
          )}
          {kommune && (
            <ListElement titleId="adresse.kommune" content={kommune} />
          )}
          {formattedDate && (
            <ListElement titleId="adresse.dato" content={formattedDate} />
          )}
        </ul>
        <div className="box-footer">
          <Undertekst>
            <FormattedMessage id="adresse.source" />
          </Undertekst>
        </div>
      </div>
    </Box>
  );
};

export default injectIntl(BoAdresse);
