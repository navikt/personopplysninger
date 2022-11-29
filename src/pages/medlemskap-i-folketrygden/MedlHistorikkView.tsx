import React from "react";
import { MedlInfo } from "types/medl";
import { FormattedMessage, useIntl } from "react-intl";
import Panel from "./Panel";
import Check from "../../assets/img/Check.svg";
import { Alert, BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";

interface Props {
  medlInfo: MedlInfo;
}

const MedlHistorikkView = (props: Props) => {
  const { medlInfo } = props;
  const { locale } = useIntl();
  const perioder = medlInfo?.perioder || [];

  const medMedlemskap = perioder.filter(
    (periode) => periode.medlem && !periode.studieinformasjon
  );
  const utenMedlemskap = perioder.filter((periode) => !periode.medlem);
  const fraLanekassen = perioder.filter((periode) => periode.studieinformasjon);
  const ingenPerioder =
    medMedlemskap.length === 0 &&
    utenMedlemskap.length === 0 &&
    fraLanekassen.length === 0;

  const lenkerTilFolketrygden: { [key: string]: string } = {
    nb: `/no/person/flere-tema/arbeid-og-opphold-i-norge/relatert-informasjon/medlemskap-i-folketrygden`,
    nn: `/no/person/flere-tema/arbeid-og-opphold-i-norge/nynorsk/medlemskap-i-folketrygda`,
    en: `/en/home/rules-and-regulations/membership-of-the-national-insurance-scheme`,
  };

  return (
    <div className="medl__tabs-innhold">
      <div className={"medl__space"}>
        <BodyLong>
          <FormattedMessage id={`medl.oversikt.ingress`} />
        </BodyLong>
      </div>
      <div className={"medl__space"}>
        <Checkbox text={`medl.oversikt.1`} />
      </div>
      <div className={"medl__space"}>
        <Checkbox text={`medl.oversikt.2`} />
      </div>

      <div className={"medl__section"}>
        <Heading level="3" size="small">
          <FormattedMessage id={"medl.situasjoner.tittel"} />
        </Heading>
      </div>
      <div className={"medl__space"}>
        <Checkbox text={`medl.situasjoner.1`} />
      </div>
      <div className={"medl__space"}>
        <Checkbox text={`medl.situasjoner.2`} />
      </div>
      <div className={"medl__space"}>
        <Checkbox text={`medl.situasjoner.3`} />
      </div>

      <div className={"medl__section"}>
        <Heading level="3" size="small">
          <FormattedMessage id={"medl.folketrygden.tittel"} />
        </Heading>
      </div>
      <div className={"medl__space"}>
        <BodyLong>
          <FormattedMessage
            id={`medl.folketrygden.ingress`}
            values={{
              lenkeTilFolketrygden: (text: string) => (
                <Link href={lenkerTilFolketrygden[locale]}>{text}</Link>
              ),
            }}
          />
        </BodyLong>
      </div>
      <div className={"medl__space"}>
        <BodyShort>
          <FormattedMessage id={`medl.folketrygden.lanekassen`} />
        </BodyShort>
      </div>

      <div className={"medl__section"}>
        <Heading level="3" size="small">
          <FormattedMessage id={"medl.perioder.tittel"} />
        </Heading>
      </div>
      <div className={"medl__space"}>
        <Alert variant="info">
          <FormattedMessage id={"medl.perioder.alert"} />
        </Alert>
      </div>
      {medMedlemskap.length > 0 ? (
        <Panel
          tittelId={"medl.medlemskap.med.tittel"}
          tittelIdIngress={`medl.medlemskap.med.ingress`}
          perioder={medMedlemskap}
        />
      ) : null}
      {utenMedlemskap.length > 0 ? (
        <Panel
          tittelId={"medl.medlemskap.uten.tittel"}
          tittelIdIngress={`medl.medlemskap.uten.ingress`}
          perioder={utenMedlemskap}
        />
      ) : null}
      {fraLanekassen.length > 0 ? (
        <Panel
          tittelId={"medl.medlemskap.lanekassen.tittel"}
          tittelIdIngress={`medl.medlemskap.lanekassen.ingress`}
          perioder={fraLanekassen}
        />
      ) : null}
      {ingenPerioder && (
        <div className={"medl__space"}>
          <Alert variant="info">
            <FormattedMessage id={"medl.ingendata"} />
          </Alert>
        </div>
      )}
    </div>
  );
};

const Checkbox = (props: { text: string }) => (
  <div className="medl__checkbox">
    <img className={"medl__kalender"} src={Check} alt="Sjekkboksikon" />
    <BodyLong>
      <FormattedMessage id={props.text} />
    </BodyLong>
  </div>
);

export default MedlHistorikkView;
