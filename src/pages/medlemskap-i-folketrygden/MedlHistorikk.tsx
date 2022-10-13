import React, { useEffect } from "react";
import { MedlInfo, MedlInnslag } from "types/medl";
import Moment from "react-moment";
import { FormattedMessage, useIntl } from "react-intl";
import PageContainer from "components/pagecontainer/PageContainer";
import MEDLIkon from "assets/img/MEDL.svg";
import Kalender from "assets/img/Kalender.svg";
import Check from "assets/img/Check.svg";
import WithMEDL from "./MedlFetch";
import ListElement from "../../components/listelement/ListElement";
import {
  Accordion,
  Alert,
  BodyLong,
  Heading,
  Label,
  Link,
} from "@navikt/ds-react";

/*
  Hent data
  Obs! Merk at listen består av
  Unntak fra medlemskap i folketrygden
*/

const MedlHistorikk = () => (
  <PageContainer
    tittelId={"medl.tittel"}
    icon={MEDLIkon}
    backTo={"/#flere-opplysninger"}
    brodsmulesti={[{ title: "medl.tittel" }]}
  >
    <WithMEDL>{({ data }) => <Perioder medlInfo={data} />}</WithMEDL>
  </PageContainer>
);

/*
  Visning
*/

interface PerioderProps {
  medlInfo: MedlInfo;
}

const Perioder = (props: PerioderProps) => {
  const { medlInfo } = props;
  const { locale } = useIntl();
  const perioder = medlInfo?.perioder || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <Heading size={"small"} level={"2"}>
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
        <Heading size={"small"} level={"2"}>
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
        <BodyLong>
          <FormattedMessage id={`medl.folketrygden.lanekassen`} />
        </BodyLong>
      </div>

      <div className={"medl__section"}>
        <Heading size={"small"} level={"2"}>
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

interface TabellProps {
  tittelId: string;
  tittelIdIngress: string;
  perioder: MedlInnslag[];
}

const Panel = (props: TabellProps) => {
  const { perioder } = props;
  const { tittelId, tittelIdIngress } = props;
  return (
    <Accordion className={"medl__space"}>
      <Accordion.Item>
        <Accordion.Header className={"medl__accordion-header"}>
          <FormattedMessage id={tittelId} />
        </Accordion.Header>
        <Accordion.Content>
          <BodyLong>
            <FormattedMessage id={tittelIdIngress} />
          </BodyLong>
          <div className={"medl__flex-table "}>
            {perioder.map((periode, i) => (
              <Periode key={i} periode={periode} />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

interface PeriodeProps {
  periode: MedlInnslag;
}

const Checkbox = (props: { text: string }) => (
  <div className="medl__checkbox">
    <img className={"medl__kalender"} src={Check} alt="Sjekkboksikon" />
    <BodyLong>
      <FormattedMessage id={props.text} />
    </BodyLong>
  </div>
);

export const Periode = (props: PeriodeProps) => {
  const { periode } = props;
  return (
    <div className="medl__flex-rad">
      <div className="medl__flex-kolonne">
        <div className={"medl__heading"}>
          <img className={"medl__kalender"} src={Kalender} alt="Kalenderikon" />
          <Label as="p">
            <FormattedMessage id={"medl.periode"} />{" "}
            <Moment format="DD.MM.YY">{periode.fraOgMed}</Moment>
            {" - "}
            <Moment format="DD.MM.YY">{periode.tilOgMed}</Moment>
          </Label>
        </div>
        <div className={"medl__flex-grid box__content"}>
          <ul className="list-column-2">
            <ListElement
              titleId="medl.hjemmel"
              content={periode.hjemmel}
              hjelpetekstId={"medl.hjemmel.hjelpetekst"}
            />
            <ListElement
              titleId="medl.trygdedekning"
              content={periode.trygdedekning}
              hjelpetekstId={"medl.trygdedekning.hjelpetekst"}
            />
            <ListElement
              className={"medl__land"}
              titleId="medl.lovvalgsland"
              content={periode.lovvalgsland}
              hjelpetekstId={"medl.lovvalgsland.hjelpetekst"}
            />
            <ListElement
              className={"medl__land"}
              titleId="medl.statsborgerland"
              content={periode.studieinformasjon?.statsborgerland}
            />
            <ListElement
              className={"medl__land"}
              titleId="medl.studieland"
              content={periode.studieinformasjon?.studieland}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedlHistorikk;
