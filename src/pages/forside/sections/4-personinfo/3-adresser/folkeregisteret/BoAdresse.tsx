import React from "react";
import moment from "moment";
import { injectIntl, InjectedIntlProps, FormattedMessage } from "react-intl";
import { Normaltekst } from "nav-frontend-typografi";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import AdressePanel from "../komponenter/AdressePanel";
import ListElement from "../../../../../../components/listelement/ListElement";
import { Boadresse } from "../../../../../../types/adresser/boadresse";
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
      {adresse || postnummer || poststed ? (
        <>
          {adressetillegg && <Normaltekst>{adressetillegg}</Normaltekst>}
          {adresse && <Normaltekst>{adresse}</Normaltekst>}
          {(postnummer || postnummer) && (
            <Normaltekst>
              {postnummer && postnummer} {poststed && poststed}
            </Normaltekst>
          )}
          {((veiadresse && veiadresse.bolignummer) ||
            kommune ||
            formattedDate) && (
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
          )}
        </>
      ) : (
        <Normaltekst>
          <FormattedMessage id="adresse.ikke.registrert" />
        </Normaltekst>
      )}
    </AdressePanel>
  );
};

export default injectIntl(BoAdresse);
