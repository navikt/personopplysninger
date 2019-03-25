import React from "react";
import moment from "moment";
import AdressePanel from "./AdressePanel";
import ListElement from "../listelement/ListElement";
import { Boadresse } from "../../types/adresser/boadresse";
import "moment/locale/nb";

moment.locale("nb");

interface Props {
  boadresse: Boadresse;
}

const BoAdresse = (props: Props) => {
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
    <AdressePanel tittel="adresse.bostedsadresse">
      <ul className="list-column-2 address-columns">
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
        {kommune && <ListElement titleId="adresse.kommune" content={kommune} />}
        {formattedDate && (
          <ListElement titleId="adresse.dato" content={formattedDate} />
        )}
      </ul>
    </AdressePanel>
  );
};

export default BoAdresse;
