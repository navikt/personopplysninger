import React, { useEffect } from "react";
import { MedlInfo, MedlInnslag } from "types/medl";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { FormattedMessage } from "react-intl";
import PageContainer from "components/pagecontainer/PageContainer";
import MEDLIkon from "assets/img/MEDL.svg";
import Kalender from "assets/img/Kalender.svg";
import Check from "assets/img/Check.svg";
import WithMEDL from "./MedlFetch";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import { Normaltekst, Systemtittel, Undertittel } from "nav-frontend-typografi";
import { Element } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import ListElement from "../../components/listelement/ListElement";

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
  const perioder = medlInfo?.perioder || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const medMedlemskap = perioder.filter((periode) => periode.medlem);
  const utenMedlemskap = perioder.filter((periode) => !periode.medlem);
  const fraLanekassen = perioder.filter((periode) => periode.studieinformasjon);

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
                <Lenke href={"$"}>{text}</Lenke>
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
      <Panel
        tittelId={"medl.medlemskap.med.tittel"}
        tittelIdIngress={`medl.medlemskap.med.ingress`}
        tittelIdIngenData={"medl.ingendata"}
        perioder={medMedlemskap}
      />
      <Panel
        tittelId={"medl.medlemskap.uten.tittel"}
        tittelIdIngress={`medl.medlemskap.uten.ingress`}
        tittelIdIngenData={"medl.ingendata"}
        perioder={utenMedlemskap}
      />
      <Panel
        tittelId={"medl.medlemskap.lanekassen.tittel"}
        tittelIdIngress={`medl.medlemskap.lanekassen.ingress`}
        tittelIdIngenData={"medl.ingendata"}
        perioder={fraLanekassen}
      />
    </div>
  );
};

interface TabellProps {
  tittelId: string;
  tittelIdIngress: string;
  tittelIdIngenData: string;
  perioder: MedlInnslag[];
}

const Panel = (props: TabellProps) => {
  const { perioder } = props;
  const { tittelId, tittelIdIngress, tittelIdIngenData } = props;
  return (
    <Ekspanderbartpanel
      tittel={<FormattedMessage id={tittelId} />}
      className={"medl__space"}
      border={true}
    >
      <Normaltekst>
        <FormattedMessage id={tittelIdIngress} />
      </Normaltekst>
      <div className={"medl__flex-table "}>
        {perioder.length > 0 ? (
          perioder.map((periode, i) => <Periode key={i} periode={periode} />)
        ) : (
          <div className="medl__ingen-data">
            <AlertStripeInfo>
              <FormattedMessage id={tittelIdIngenData} />
            </AlertStripeInfo>
          </div>
        )}
      </div>
    </Ekspanderbartpanel>
  );
};

interface PeriodeProps {
  periode: MedlInnslag;
}

const Checkbox = (props: { text: string }) => (
  <div className="medl__checkbox">
    <img className={"medl__kalender"} src={Check} alt="Sjekkboksikon" />
    <Normaltekst>
      <FormattedMessage id={props.text} />
    </Normaltekst>
  </div>
);

export const Periode = (props: PeriodeProps) => {
  const { periode } = props;
  return (
    <div className="medl__flex-rad">
      <div className="medl__flex-kolonne ">
        <div className={"medl__heading"}>
          <img className={"medl__kalender"} src={Kalender} alt="Kalenderikon" />
          <Element>
            <FormattedMessage id={"medl.periode"} />{" "}
            <Moment format="DD.MM.YY">{periode.fraOgMed}</Moment>
            {" - "}
            <Moment format="DD.MM.YY">{periode.tilOgMed}</Moment>
          </Element>
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
