import React, { ChangeEvent, useState } from "react";
import Box from "components/box/Box";
import dittNavKontorIkon from "assets/img/DittNavKontor.svg";
import { EnhetKontaktInfo } from "types/enhetKontaktInfo";
import { GeografiskTilknytning } from "types/adresser";
import { Normaltekst, Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { Select } from "nav-frontend-skjema";
import { useIntl } from "react-intl";
import ListElement from "components/listelement/ListElement";
import Apningstid from "./apningstid/Apningstid";
import { print } from "utils/text";
import Kilde from "components/kilde/Kilde";
import { RADIX_DECIMAL } from "utils/formattering";
import Lenke from "nav-frontend-lenker";
import { useStore } from "store/Context";

interface Props {
  enhetKontaktInformasjon: EnhetKontaktInfo;
  geografiskTilknytning?: GeografiskTilknytning;
}

const DittNavKontor = (props: Props) => {
  const { formatMessage: msg } = useIntl();
  const [{ locale }] = useStore();
  const { enhet } = props.enhetKontaktInformasjon;
  const publikumsmottak = (enhet && enhet.publikumsmottak) || [];
  const [valgtMottakId, settValgtMottakId] = useState(
    publikumsmottak.length ? 0 : -1
  );

  if (!enhet || !props.geografiskTilknytning) {
    return null;
  }

  const { geografiskTilknytning } = props;
  const { postadresse } = enhet;

  return (
    <Box
      id="ditt-nav-kontor"
      tittel="dittnavkontor.tittel"
      beskrivelse="dittnavkontor.beskrivelse"
      icon={dittNavKontorIkon}
    >
      <div className="dittnavkontor__header">
        <div className="dittnavkontor__ingress">
          <Normaltekst>
            <FormattedMessage id="dittnavkontor.ingress" />
          </Normaltekst>
          <Element>{geografiskTilknytning.enhet}</Element>
        </div>
        {publikumsmottak.length > 1 && (
          <Select
            label={``}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              settValgtMottakId(
                parseInt(event.currentTarget.value, RADIX_DECIMAL)
              );
            }}
          >
            <option value="-1">
              {`${msg({
                id: "dittnavkontor.publikumsmottakfor",
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
                  `${msg({
                    id: "dittnavkontor.postboks",
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
          titleId="dittnavkontor.kontaktinfo.overskrift"
          content={
            <Lenke href={`/person/kontakt-oss/${locale}/`}>
              <FormattedMessage id="dittnavkontor.kontaktinfo.lenke" />
            </Lenke>
          }
        />
      </ul>
      <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
    </Box>
  );
};

export default DittNavKontor;
