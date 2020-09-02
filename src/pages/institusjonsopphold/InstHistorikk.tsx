import React, { useState, Fragment, useEffect } from "react";
import { Element } from "nav-frontend-typografi";
import moment from "moment";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
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
        ekspandert: !i ? true : false,
      };
    } else {
      initState[year].innslag.push(innslag);
    }
  });

  const [data, setData] = useState(initState);

  return (
    <div className="historikk__tabs-innhold historikk__flex-table">
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
    </div>
  );
};

export default InstHistorikk;
