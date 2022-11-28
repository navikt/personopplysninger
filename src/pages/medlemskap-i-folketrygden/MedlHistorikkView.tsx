import React from "react";
import { MedlInfo } from "types/medl";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { FormattedMessage, useIntl } from "react-intl";
import { Normaltekst, Systemtittel, Undertittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import Panel from "./Panel";
import Check from "../../assets/img/Check.svg";

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
        <Normaltekst>
          <FormattedMessage id={`medl.oversikt.ingress`} />
        </Normaltekst>
      </div>
      <div className={"medl__space"}>
        <Checkbox text={`medl.oversikt.1`} />
      </div>
      <div className={"medl__space"}>
        <Checkbox text={`medl.oversikt.2`} />
      </div>

      <div className={"medl__section"}>
        <Undertittel>
          <FormattedMessage id={"medl.situasjoner.tittel"} />
        </Undertittel>
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
        <Undertittel>
          <FormattedMessage id={"medl.folketrygden.tittel"} />
        </Undertittel>
      </div>
      <div className={"medl__space"}>
        <Normaltekst>
          <FormattedMessage
            id={`medl.folketrygden.ingress`}
            values={{
              lenkeTilFolketrygden: (text: string) => (
                <Lenke href={lenkerTilFolketrygden[locale]}>{text}</Lenke>
              ),
            }}
          />
        </Normaltekst>
      </div>
      <div className={"medl__space"}>
        <Normaltekst>
          <FormattedMessage id={`medl.folketrygden.lanekassen`} />
        </Normaltekst>
      </div>

      <div className={"medl__section"}>
        <Systemtittel>
          <FormattedMessage id={"medl.perioder.tittel"} />
        </Systemtittel>
      </div>
      <div className={"medl__space"}>
        <AlertStripeInfo>
          <FormattedMessage id={"medl.perioder.alert"} />
        </AlertStripeInfo>
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
          <AlertStripeInfo>
            <FormattedMessage id={"medl.ingendata"} />
          </AlertStripeInfo>
        </div>
      )}
    </div>
  );
};

const Checkbox = (props: { text: string }) => (
  <div className="medl__checkbox">
    <img className={"medl__kalender"} src={Check} alt="Sjekkboksikon" />
    <Normaltekst>
      <FormattedMessage id={props.text} />
    </Normaltekst>
  </div>
);

export default MedlHistorikkView;
