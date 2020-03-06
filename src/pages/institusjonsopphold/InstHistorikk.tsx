import React, { useState, Fragment, useEffect } from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
import moment from "moment";
import {
  AlertStripeAdvarsel,
  AlertStripeInfo
} from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { InstInfo } from "types/inst";
import PageContainer from "components/pagecontainer/PageContainer";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithInst from "./InstFetch";

/*
  Hent data
*/
const InstHistorikk = () => (
  <PageContainer
    tittelId={"inst.tittel"}
    icon={INSTIkon}
    backTo={"/#flere-opplysninger"}
    brodsmulesti={[{ title: "inst.tittel" }]}
  >
    <WithInst>{({ data }) => <Tabell instInfo={data} />}</WithInst>
  </PageContainer>
);

/*
  Visning
*/
const Tabell = (props: { instInfo: InstInfo }) => {
  const location = useLocation();
  const { instInfo } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initState: {
    [key: string]: {
      innslag: InstInfo;
      ekspandert: boolean;
    };
  } = {};

  instInfo.forEach((innslag, i) => {
    const year = moment(innslag.registreringstidspunkt).year();

    if (!initState[year]) {
      initState[year] = {
        innslag: [innslag],
        ekspandert: !i ? true : false
      };
    } else {
      initState[year].innslag.push(innslag);
    }
  });

  const [data, setData] = useState(initState);

  return (
    <div className="historikk__tabs-innhold historikk__flex-table">
      <div className="arbeidsforhold__disclaimer">
        <AlertStripeInfo>
          <Normaltekst>
            NAV trenger informasjon om institusjonsopphold fordi det kan ha
            betydning for din rett til ytelser fra NAV. Arbeids- og
            velferdsetaten kan pålegge helseinstitusjoner, fengsler og boformer
            for heldøgns omsorg og pleie å gi rutinemessige meldinger om
            innskriving og utskriving av klienter,{" "}
            <a href="https://lovdata.no/lov/1997-02-28-19/§21-4">
              jfr. Folketrygdloven § 21-4
            </a>
            .
          </Normaltekst>
        </AlertStripeInfo>
      </div>
      {Object.keys(data).length > 0 ? (
        <>
          <div className="historikk__flex-rad historikk__head">
            <div className="historikk__flex-kolonne">
              <Element>
                <FormattedMessage id="inst.periode" />
              </Element>
            </div>
            <div className="historikk__flex-kolonne">
              <Element>
                <FormattedMessage id="inst.institusjon" />
              </Element>
            </div>
          </div>
          {Object.keys(data)
            .reverse()
            .map(year => {
              const value = data[year];
              const onClick = () =>
                setData({
                  ...data,
                  [year]: {
                    ...data[year],
                    ekspandert: !data[year].ekspandert
                  }
                });

              return (
                <Fragment key={year}>
                  <div className="historikk__flex-rad" key={year}>
                    <div
                      className="historikk__flex-kolonne af-liste__ekspander"
                      onClick={onClick}
                    >
                      {year}{" "}
                      {value.ekspandert ? <OppChevron /> : <NedChevron />}
                    </div>
                    <div />
                  </div>
                  {value.ekspandert &&
                    value.innslag.map((innslag, i) => (
                      <div className="historikk__flex-rad" key={i}>
                        <div className="historikk__flex-kolonne historikk__heading">
                          <Moment format="DD.MM">{innslag.startdato}</Moment>
                          {` - `}
                          {innslag.faktiskSluttdato && (
                            <Moment format="DD.MM">
                              {innslag.faktiskSluttdato}
                            </Moment>
                          )}
                        </div>
                        <div className="historikk__flex-kolonne">
                          <Link
                            to={`${location.pathname}/${innslag.registreringstidspunkt}`}
                            className="lenke"
                          >
                            {innslag.institusjonsnavn}
                          </Link>
                        </div>
                      </div>
                    ))}
                </Fragment>
              );
            })}
        </>
      ) : (
        <div className="historikk__ingen-data">
          <AlertStripeInfo>
            <FormattedMessage id="inst.ingendata" />
          </AlertStripeInfo>
        </div>
      )}
      <div className="arbeidsforhold__disclaimer">
        <AlertStripeAdvarsel>
          <Normaltekst>
            NAV viser kun opphold på alders- og sykehjem og andre
            helseinstitusjoner foreløpig. Opphold på et fengsel vises ikke i
            denne versjonen av innsynstjenesten NAV tilbyr deg, men vi jobber
            med å videreutvikle løsningen slik opphold på alle institusjoner
            blir synlig.
          </Normaltekst>
        </AlertStripeAdvarsel>
      </div>
    </div>
  );
};

export default InstHistorikk;
