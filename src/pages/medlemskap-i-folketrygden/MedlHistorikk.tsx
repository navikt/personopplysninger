import React, { useEffect } from "react";
import { MedlInfo, MedlInnslag } from "types/medl";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { FormattedMessage } from "react-intl";
import PageContainer from "components/pagecontainer/PageContainer";
import MEDLIkon from "assets/img/MEDL.svg";
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
  const perioder = medlInfo.perioder;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const medMedlemskap = perioder.filter((periode) => periode.medlem);
  const utenMedlemskap = perioder.filter((periode) => !periode.medlem);
  const fraLanekassen = perioder.filter((periode) => periode.studieinformasjon);

  return (
    <div className="medl-historikk__tabs-innhold">
      <div className={"medl-historikk__space"}>
        <Normaltekst>
          <FormattedMessage
            id={"Oversikten på denne siden er kun aktuell for deg som:"}
          />
        </Normaltekst>
      </div>
      <div className={"medl-historikk__space"}>
        <Normaltekst>
          <FormattedMessage
            id={`Ser du ingen bokser med perioder under, er oversikten ikke aktuell for deg.`}
          />
        </Normaltekst>
      </div>
      <div className={"medl-historikk__space"}>
        <Undertittel>
          <FormattedMessage id={"Ulike situasjoner"} />
        </Undertittel>
      </div>
      <div className={"medl-historikk__space"}>
        <Normaltekst>
          <FormattedMessage
            id={`Hvis du bor og jobber i Norge, er du vanligvis medlem i folketrygden. Perioder med denne type medlemskap vil ikke vises i oversikten.`}
          />
        </Normaltekst>
      </div>

      <div className={"medl-historikk__space"}>
        <Undertittel>
          <FormattedMessage id={"Hva betyr medlemskap i folketrygden?"} />
        </Undertittel>
      </div>

      <div className={"medl-historikk__space"}>
        <Normaltekst>
          <FormattedMessage
            values={{
              lenkeTilFolketrygden: (text: string) => (
                <Lenke href={"$"}>{text}</Lenke>
              ),
            }}
            id={`medl.folketrygden.ingress`}
          />
        </Normaltekst>
      </div>

      <div className={"medl-historikk__space"}>
        <Normaltekst>
          <FormattedMessage
            id={`Kontakt Statens lånekasse for utdanning hvis du har spørsmål om perioder med støtte fra lånekassen`}
          />
        </Normaltekst>
      </div>

      <div className={"medl-historikk__space"}>
        <Systemtittel>
          <FormattedMessage id={"Oversikt over perioder"} />
        </Systemtittel>
      </div>
      <div className={"medl-historikk__space"}>
        <AlertStripeInfo>
          <FormattedMessage id={"Kun perioder fra og med 2015 vises"} />
        </AlertStripeInfo>
      </div>
      <Panel
        tittelId={"Med medlemskap"}
        tittelIdIngress={`Hvis du har søkt NAV om medlemskap i folketrygden og fått innvilget det, vil du se perioden i oversikten.`}
        tittelIdIngenData={"medl.ingendata"}
        perioder={medMedlemskap}
      />
      <Panel
        tittelId={"Uten medlemskap"}
        tittelIdIngress={`Oversikten viser prioder der NAV har fått informasjon fra tygdemyndigheten i et annet land om at du var med i trygdeordningen i bostedslandet ditt mens du jobbet i Norge.`}
        tittelIdIngenData={"medl.ingendata"}
        perioder={utenMedlemskap}
      />
      <Panel
        tittelId={"Med støtte fra Lånekassen for å studere i utlandet"}
        tittelIdIngress={`Oversikten viser perioder der lånekassen har registrert deg som student ved et utenlandsk lærested.`}
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
      className={"medl-historikk__space"}
      border={true}
    >
      <Normaltekst>
        <FormattedMessage id={tittelIdIngress} />
      </Normaltekst>
      <div className={"medl-historikk__flex-table "}>
        {perioder.length > 0 ? (
          perioder.map((periode, i) => <Periode key={i} periode={periode} />)
        ) : (
          <div className="medl-historikk__ingen-data">
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

export const Periode = (props: PeriodeProps) => {
  const { periode } = props;
  return (
    <div className="medl-historikk__flex-rad">
      <div className="medl-historikk__flex-kolonne medl-historikk__heading">
        <Element>
          <FormattedMessage id={"Periode"} />{" "}
          <Moment format="DD.MM.YY">{periode.fraOgMed}</Moment>
          {" - "}
          <Moment format="DD.MM.YY">{periode.tilOgMed}</Moment>
        </Element>
        <div className={"medl-historikk__flex-grid box__content"}>
          <ul className="list-column-2">
            <ListElement titleId="medl.hjemmel" content={periode.hjemmel} />
            <ListElement
              titleId="medl.dekning"
              content={periode.trygdedekning ? "Full" : "Halv"}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedlHistorikk;
