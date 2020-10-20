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
  const perioder = medlInfo.perioder;

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
          <FormattedMessage
            id={`Hvis du bor og jobber i Norge, er du vanligvis medlem i folketrygden. Perioder med denne type medlemskap vil ikke vises i oversikten. Oversikten er kun aktuellfor deg som har`}
          />
        </Normaltekst>
      </div>
      <div className={"medl__space"}>
        <Checkbox
          text={`bodd, jobbet eller studert i utlandet, og du har søkt om medlemskap i folketrygden og fått bekreftet det`}
        />
      </div>
      <div className={"medl__space"}>
        <Checkbox
          text={`jobbet i Norge, men var med i trygdeordningen i et annet land`}
        />
      </div>

      <div className={"medl__section"}>
        <Undertittel>
          <FormattedMessage id={"Ulike situasjoner"} />
        </Undertittel>
      </div>
      <div className={"medl__space"}>
        <Checkbox
          text={`Flytter du til utlandet for å bo eller jobbe, avhenger medlemskap i folketrygden blant annet av hva du gjør og varigheten på oppholdet.`}
        />
      </div>
      <div className={"medl__space"}>
        <Checkbox
          text={`Norske studenter i utlandet vil vanligvis være pliktige medlemmer i folketrygden, hvis de får støtte fra Lånekassen for å studere på heltid ved et utenlandsk universitet eller en høyskole.`}
        />
      </div>
      <div className={"medl__space"}>
        <Checkbox
          text={`Er du bosatt i et annet land, men jobber helt eller delvis i Norge, kan du være med i trygdeordningen i bostedslandet ditt og være unntatt fra medlemskap i folketrygden.`}
        />
      </div>

      <div className={"medl__section"}>
        <Undertittel>
          <FormattedMessage id={"Hva betyr medlemskap i folketrygden?"} />
        </Undertittel>
      </div>
      <div className={"medl__space"}>
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

      <div className={"medl__space"}>
        <Normaltekst>
          <FormattedMessage
            id={`Kontakt Statens lånekasse for utdanning hvis du har spørsmål om perioder med støtte fra Lånekassen.`}
          />
        </Normaltekst>
      </div>

      <div className={"medl__section"}>
        <Systemtittel>
          <FormattedMessage id={"Oversikt over perioder"} />
        </Systemtittel>
      </div>
      <div className={"medl__space"}>
        <AlertStripeInfo>
          <FormattedMessage id={"Kun perioder fra og med 2015 vises."} />
        </AlertStripeInfo>
      </div>
      <Panel
        tittelId={"Med medlemskap"}
        tittelIdIngress={`Oversikten viser perioder der du har søkt NAV om medlemskap i folketrygden og fått bekreftet det`}
        tittelIdIngenData={"medl.ingendata"}
        perioder={medMedlemskap}
      />
      <Panel
        tittelId={"Uten medlemskap"}
        tittelIdIngress={`Oversikten viser perioder der NAV har fått informasjon fra trygdemyndigheten i et annet land om at du var med i trygdeordningen i bostedslandet ditt mens du jobbet i Norge. `}
        tittelIdIngenData={"medl.ingendata"}
        perioder={utenMedlemskap}
      />
      <Panel
        tittelId={"Med støtte fra Lånekassen for å studere i utlandet"}
        tittelIdIngress={`Oversikten viser perioder der Lånekassen har registrert deg som student ved et utenlandsk lærested.`}
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
    <img className={"medl__kalender"} src={Check} />
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
          <img className={"medl__kalender"} src={Kalender} />
          <Element>
            <FormattedMessage id={"Periode"} />{" "}
            <Moment format="DD.MM.YY">{periode.fraOgMed}</Moment>
            {" - "}
            <Moment format="DD.MM.YY">{periode.tilOgMed}</Moment>
          </Element>
        </div>
        <div className={"medl__flex-grid box__content"}>
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
