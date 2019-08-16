import React, { ChangeEvent, useState } from "react";
import Box from "../../../../../components/box/Box";
import dittNavKontorIkon from "../../../../../assets/img/DittNavKontor.svg";
import { Enhet } from "../../../../../types/enhetKontaktInfo";
import { GeografiskTilknytning } from "../../../../../types/adresser";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Select } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import ListElement from "../../../../../components/listelement/ListElement";
import Apningstid from "../../../../../components/apningstid/Apningstid";
import { print } from "../../../../../utils/text";
import Kilde from "../../../../../components/kilde/Kilde";

interface Props {
  enhetKontaktInfo: Enhet;
  geografiskTilknytning: GeografiskTilknytning;
}

const DittNavKontor = (props: Props & InjectedIntlProps) => {
  const { enhetKontaktInfo, geografiskTilknytning, intl } = props;
  const { publikumsmottak, postadresse } = enhetKontaktInfo;
  const [valgtMottakId, settValgtMottakId] = useState(
    publikumsmottak.length > 1 ? -1 : 0
  );

  return (
    <Box
      id="dittnavkontor"
      tittel="dittnavkontor.tittel"
      beskrivelse="dittnavkontor.beskrivelse"
      icon={dittNavKontorIkon}
    >
      <hr className="box__linje-bred" />
      <div className="dittnavkontor__header">
        <div className="dittnavkontor__ingress">
          <Normaltekst>
            <FormattedMessage id="dittnavkontor.ingress" />
          </Normaltekst>
          <Element>{geografiskTilknytning.enhet}</Element>
        </div>
        {publikumsmottak.length > 1 && (
          <Select
            label=""
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              settValgtMottakId(parseInt(event.currentTarget.value));
            }}
          >
            <option value="-1">
              {`${intl.formatMessage({
                id: "dittnavkontor.publikumsmottakfor"
              })} ${geografiskTilknytning.enhet}`}
            </option>
            {publikumsmottak.map((mottak, id) => (
              <option key={id} value={id}>
                {`${print(mottak.poststed).toUpperCase()} - ${print(
                  mottak.gateadresse
                )} ${print(mottak.husnummer)}${print(
                  mottak.husbokstav
                )}, ${print(mottak.postnummer)} ${print(mottak.poststed)}`}
              </option>
            ))}
          </Select>
        )}
        <div className="dittnavkontor__adresser">
          {postadresse && (
            <div className="dittnavkontor__postadresse">
              <Element>
                <FormattedMessage id="dittnavkontor.postadresse" />
              </Element>
              <Normaltekst>
                {postadresse.type === "stedsadresse" &&
                  `${print(postadresse.gatenavn)} ${print(
                    postadresse.husnummer
                  )} ${print(postadresse.husbokstav)}`}
                {postadresse.type === "postboksadresse" &&
                  `${props.intl.formatMessage({
                    id: "dittnavkontor.postboks"
                  })} ${print(postadresse.postboksnummer)} ${print(
                    postadresse.postboksanlegg
                  )}`}
              </Normaltekst>
              <Normaltekst>
                {print(postadresse.postnummer)} {print(postadresse.poststed)}
              </Normaltekst>
            </div>
          )}
          {valgtMottakId !== -1 && (
            <div className="dittnavkontor__publikumsmottak">
              <Element>
                <FormattedMessage id="dittnavkontor.publikumsmottak" />
              </Element>
              <Normaltekst>
                {`${print(publikumsmottak[valgtMottakId].gateadresse)} ${print(
                  publikumsmottak[valgtMottakId].husnummer
                )}${print(publikumsmottak[valgtMottakId].husbokstav)}`}
              </Normaltekst>
              <Normaltekst>
                {`${print(publikumsmottak[valgtMottakId].postnummer)} ${print(
                  publikumsmottak[valgtMottakId].poststed
                )}`}
              </Normaltekst>
            </div>
          )}
        </div>
      </div>
      <div>
        {valgtMottakId !== -1 ? (
          <>
            <Element>
              <FormattedMessage id="dittnavkontor.apningstider" />
            </Element>
            <div className="apningstid__container">
              <Apningstid
                apningstid={publikumsmottak[valgtMottakId].aapningMandag}
              />
              <Apningstid
                apningstid={publikumsmottak[valgtMottakId].aapningTirsdag}
              />
              <Apningstid
                apningstid={publikumsmottak[valgtMottakId].aapningOnsdag}
              />
              <Apningstid
                apningstid={publikumsmottak[valgtMottakId].aapningTorsdag}
              />
              <Apningstid
                apningstid={publikumsmottak[valgtMottakId].aapningFredag}
              />
            </div>
            {publikumsmottak[valgtMottakId].aapningAndre && (
              <>
                <Element>
                  <FormattedMessage id="dittnavkontor.andreapningstider" />
                </Element>
                <div className="apningstid__container">
                  {publikumsmottak[valgtMottakId].aapningAndre!.map(
                    (apningstid, id) => (
                      <Apningstid key={id} apningstid={apningstid} />
                    )
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <hr />
        )}
      </div>
      <ul className="dittnavkontor__footer list-column-2">
        <ListElement
          titleId="dittnavkontor.kontaktinfo.kontaktsenter.tittel"
          content={
            <FormattedHTMLMessage id="dittnavkontor.kontaktinfo.kontaktsenter.tlfnr" />
          }
        >
          <>
            <FormattedHTMLMessage id="dittnavkontor.kontaktinfo.pensjon.tlfnr" />
            (<FormattedMessage id="dittnavkontor.kontaktinfo.pensjon" />)
          </>
        </ListElement>
        <ListElement
          titleId="dittnavkontor.kontaktinfo.apningstider.tittel"
          content={intl.formatMessage({
            id: "dittnavkontor.kontaktinfo.apningstider.innhold"
          })}
        />
      </ul>
      <Kilde kilde="personalia.source.nav" />
    </Box>
  );
};

export default injectIntl(DittNavKontor);
