import React, { ChangeEvent, useState } from "react";
import Box from "../../../../../components/box/Box";
import adresseIkon from "../../../../../assets/img/adresser.svg";
import { EnhetKontaktInfo } from "../../../../../types/enhetKontaktInfo";
import { GeografiskTilknytning } from "../../../../../types/adresser";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Select } from "nav-frontend-skjema";
import { injectIntl, InjectedIntlProps } from "react-intl";
import ListElement from "../../../../../components/listelement/ListElement";
import Apningstid from "../../../../../components/apningstid/Apningstid";

interface Props {
  enhetKontaktInfo: EnhetKontaktInfo;
  geografiskTilknytning: GeografiskTilknytning;
}

const DittNavKontor = (props: Props & InjectedIntlProps) => {
  const { enhetKontaktInfo, geografiskTilknytning, intl } = props;
  const publikumsmottak = enhetKontaktInfo.enhet.publikumsmottak;
  const [valgtMottakId, settValgtMottakId] = useState(-1);

  return (
    <Box id="dittnavkontor" tittel="dittnavkontor.tittel" icon={adresseIkon}>
      <div className="dittnavkontor__header">
        <div className="dittnavkontor__ingress">
          <Normaltekst>
            <FormattedMessage id="dittnavkontor.ingress" />
          </Normaltekst>
          <Element>{geografiskTilknytning.enhet}</Element>
        </div>
        <Select
          label=""
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            settValgtMottakId(parseInt(event.currentTarget.value));
          }}
        >
          <option value="-1">
            {`${intl.formatMessage({ id: "dittnavkontor.publikumsmottak" })} ${
              geografiskTilknytning.enhet
            }`}
          </option>
          {publikumsmottak.map((mottak, id) => (
            <option key={id} value={id}>
              {mottak.poststed} - {mottak.gateadresse} {mottak.postnummer}
              {mottak.poststed}
            </option>
          ))}
        </Select>
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
                    apningstid => (
                      <Apningstid apningstid={apningstid} />
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
          titleId="dittnavkontor.kontaktinfo.kontaktsenteret.tittel"
          content={intl.formatMessage({
            id: "dittnavkontor.kontaktinfo.kontaktsenteret.tlfnr"
          })}
        />
        <ListElement
          titleId="dittnavkontor.kontaktinfo.pensjon.tittel"
          content={intl.formatMessage({
            id: "dittnavkontor.kontaktinfo.pensjon.tlfnr"
          })}
        />
        <ListElement
          titleId="dittnavkontor.kontaktinfo.apningstider.tittel"
          content={intl.formatMessage({
            id: "dittnavkontor.kontaktinfo.apningstider.innhold"
          })}
        />
      </ul>
    </Box>
  );
};

export default injectIntl(DittNavKontor);
