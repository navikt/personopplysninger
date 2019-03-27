import React from "react";
import moment from "moment";
import { Normaltekst } from "nav-frontend-typografi";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import AdressePanel from "../../../../components/adresse/AdressePanel";
import ListElement from "../../../../components/listelement/ListElement";
import { Boadresse } from "../../../../types/adresser/boadresse";
import Kilde from "../../../../components/kilde/Kilde";
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
  return (
    <AdressePanel tittel="adresse.bostedsadresse">
      <>
        {adresse && <Normaltekst>{adresse}</Normaltekst>}
        {adressetillegg && <Normaltekst>{adressetillegg}</Normaltekst>}
        {(postnummer || postnummer) && (
          <Normaltekst>
            {postnummer && postnummer} {poststed && poststed}
          </Normaltekst>
        )}
        <Lesmerpanel className="addresse__lesmer">
          <ul className="list-column-2 address-columns">
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
        </Lesmerpanel>
        <Kilde
          tekst="personalia.source.folkeregisteret"
          lenkeTekst="personalia.link.folkeregisteret"
          href="https://www.skatteetaten.no/person/folkeregister/"
        />
      </>
    </AdressePanel>
  );
};

export default BoAdresse;
