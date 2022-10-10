import React, { useState, Fragment, useEffect } from "react";
import { Element } from "nav-frontend-typografi";
import moment from "moment";
import Moment from "react-moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import PageContainer from "components/pagecontainer/PageContainer";
import SkattIkon from "assets/img/Skattekort.svg";
import WithSkatt from "./SkattFetch";
import Lenke from "nav-frontend-lenker";
import { Skattetrekksmelding } from "types/skattetrekksmeldinger";
import { Alert } from "@navikt/ds-react";

/*
  Hent data
*/
const SkattkortHistorikk = () => (
  <PageContainer
    tittelId={"skattetrekksmeldinger.tittel"}
    icon={SkattIkon}
    backTo={"/#flere-opplysninger"}
    brodsmulesti={[{ title: "skattetrekksmeldinger.tittel" }]}
  >
    <WithSkatt>{({ data }) => <Tabell instInfo={data} />}</WithSkatt>
  </PageContainer>
);

/*
  Visning
*/
const Tabell = (props: { instInfo: Skattetrekksmelding[] }) => {
  const location = useLocation();
  const { instInfo } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initState: {
    [key: string]: {
      instInnslag: Skattetrekksmelding[];
      ekspandert: boolean;
    };
  } = {};

  instInfo.forEach((instInnslag, i) => {
    const year = moment(instInnslag.registreringstidspunkt).year();

    if (!initState[year]) {
      initState[year] = {
        instInnslag: [instInnslag],
        ekspandert: !i ? true : false,
      };
    } else {
      initState[year].instInnslag.push(instInnslag);
    }
  });

  const [data, setData] = useState(initState);

  return (
    <div className="historikk__tabs-innhold historikk__flex-table">
      {Object.keys(data).length > 0 ? (
        <>
          <div className={"historikk__info"}>
            <Alert variant="info">
              <FormattedMessage
                id={"lenker.dsop.info"}
                values={{
                  a: (text: String) => (
                    <Lenke href="https://altinn.no" target="blank">
                      {text}
                    </Lenke>
                  ),
                }}
              />
            </Alert>
          </div>
          <div className="historikk__flex-rad historikk__head">
            <div className="historikk__flex-kolonne">
              <Element>
                <FormattedMessage id="inst.periode" />
              </Element>
            </div>
            <div className="historikk__flex-kolonne">
              <Element>
                <FormattedMessage id="dsop.mottaker" />
              </Element>
            </div>
          </div>
          {Object.keys(data)
            .reverse()
            .map((year) => {
              const value = data[year];
              const onClick = () =>
                setData({
                  ...data,
                  [year]: {
                    ...data[year],
                    ekspandert: !data[year].ekspandert,
                  },
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
                    value.instInnslag.map((instInnslag, i) => (
                      <div className="historikk__flex-rad" key={i}>
                        <div className="historikk__flex-kolonne historikk__heading">
                          <Moment format="DD.MM">
                            {instInnslag.startdato}
                          </Moment>
                          {` - `}
                          {instInnslag.faktiskSluttdato && (
                            <Moment format="DD.MM">
                              {instInnslag.faktiskSluttdato}
                            </Moment>
                          )}
                        </div>
                        <div className="historikk__flex-kolonne">
                          <Link
                            to={`${location.pathname}/${instInnslag.registreringstidspunkt}`}
                            className="lenke"
                          >
                            {instInnslag.institusjonsnavn}
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
          <Alert variant="info">
            <FormattedMessage id="skattetrekksmeldinger.ingendata" />
          </Alert>
        </div>
      )}
    </div>
  );
};

export default SkattkortHistorikk;
