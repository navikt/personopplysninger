import React, { ChangeEvent, useState } from "react";
import Box from "components/box/Box";
import dittNavKontorIkon from "assets/img/DittNavKontor.svg";
import { EnhetKontaktInfo } from "types/enhetKontaktInfo";
import { GeografiskTilknytning } from "types/adresser";
import { FormattedMessage, useIntl } from "react-intl";
import ListElement from "components/listelement/ListElement";
import Apningstid from "./apningstid/Apningstid";
import { print } from "utils/text";
import Kilde from "components/kilde/Kilde";
import { RADIX_DECIMAL } from "utils/formattering";
import { useStore } from "store/Context";
import { BodyShort, Heading, Label, Link, Select } from "@navikt/ds-react";

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
      visAnkerlenke={true}
    >
      <div className="dittnavkontor__header">
        <div className="dittnavkontor__ingress">
          <BodyShort>
            <FormattedMessage id="dittnavkontor.ingress" />
            <Label as="span">{geografiskTilknytning.enhet}</Label>
          </BodyShort>
        </div>
        {publikumsmottak.length > 1 && (
          <Select
            label={msg({ id: "dittnavkontor.select.label" })}
            hideLabel={true}
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
              <Heading size={"xsmall"} level={"3"}>
                <FormattedMessage id="dittnavkontor.postadresse" />
              </Heading>
              <BodyShort>
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
              </BodyShort>
              <BodyShort>
                {print(postadresse.postnummer)} {print(postadresse.poststed)}
              </BodyShort>
            </div>
          )}
          {valgtMottakId !== -1 && (
            <div className="dittnavkontor__publikumsmottak">
              <Heading size={"xsmall"} level={"3"}>
                <FormattedMessage id="dittnavkontor.publikumsmottak" />
              </Heading>
              <BodyShort>
                {`${print(publikumsmottak[valgtMottakId].gateadresse)} ${print(
                  publikumsmottak[valgtMottakId].husnummer
                )}${print(publikumsmottak[valgtMottakId].husbokstav)}`}
              </BodyShort>
              <BodyShort>
                {`${print(publikumsmottak[valgtMottakId].postnummer)} ${print(
                  publikumsmottak[valgtMottakId].poststed
                )}`}
              </BodyShort>
            </div>
          )}
        </div>
      </div>
      <div>
        {valgtMottakId !== -1 ? (
          <>
            <Heading size={"xsmall"} level={"3"}>
              <FormattedMessage id="dittnavkontor.apningstider" />
            </Heading>
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
                <Heading size={"xsmall"} level={"3"}>
                  <FormattedMessage id="dittnavkontor.andreapningstider" />
                </Heading>
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
            <Link
              href={`/person/kontakt-oss/${locale === "en" ? "en" : "nb"}/`}
            >
              <FormattedMessage id="dittnavkontor.kontaktinfo.lenke" />
            </Link>
          }
        />
      </ul>
      <Kilde kilde="personalia.source.nav" lenkeType={"INGEN"} />
    </Box>
  );
};

export default DittNavKontor;
