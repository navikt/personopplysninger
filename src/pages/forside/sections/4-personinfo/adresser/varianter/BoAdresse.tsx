import React from "react";
import moment from "moment";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Normaltekst } from "nav-frontend-typografi";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import AdressePanel from "../../../../../../components/adresse/AdressePanel";
import ListElement from "../../../../../../components/listelement/ListElement";
import { Boadresse } from "../../../../../../types/adresser/boadresse";
import Kilde from "../../../../../../components/kilde/Kilde";
import "moment/locale/nb";

moment.locale("nb");

interface Props {
  boadresse: Boadresse;
}

const BoAdresse = (props: Props & InjectedIntlProps) => {
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
        <Lesmerpanel
          className="addresse__lesmer"
          apneTekst={props.intl.formatMessage({
            id: "adresse.bostedsadresse.apneTekst"
          })}
          lukkTekst={props.intl.formatMessage({
            id: "adresse.bostedsadresse.lukkTekst"
          })}
        >
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
          kilde="personalia.source.folkeregisteret"
          lenke="https://www.skatteetaten.no/person/folkeregister/"
          lenkeTekst="personalia.link.folkeregisteret"
        />
      </>
    </AdressePanel>
  );
};

export default injectIntl(BoAdresse);
