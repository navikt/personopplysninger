import React, { Fragment, useEffect, useState } from "react";
import { DsopInfo } from "types/dsop";
import { Element } from "nav-frontend-typografi";
import moment from "moment";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import Lenke from "nav-frontend-lenker";

interface Props {
  dsopInfo: DsopInfo;
}

export const DsopHistorikkView = (props: Props) => {
  const location = useLocation();
  const { dsopInfo } = props;

  const initState: {
    [år: string]: {
      innslag: DsopInfo;
      ekspandert: boolean;
    };
  } = {};

  dsopInfo.forEach((innslag, i) => {
    const year = moment(innslag.uthentingsTidspunkt).year();

    if (!initState[year]) {
      initState[year] = {
        innslag: [innslag],
        ekspandert: !i,
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
          <div className={"historikk__info"}>
            <AlertStripeInfo>
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
            </AlertStripeInfo>
          </div>
          <div className="historikk__flex-rad historikk__head">
            <div className="historikk__flex-kolonne">
              <Element>
                <FormattedMessage id="dsop.uthentingstidspunkt" />
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
                          <Moment format="DD.MM - hh:mm">
                            {innslag.uthentingsTidspunkt}
                          </Moment>
                        </div>
                        <div className="historikk__flex-kolonne">
                          <Link
                            to={`${location.pathname}/${innslag.uthentingsTidspunkt}`}
                            className="lenke"
                          >
                            {innslag.mottakernavn}
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
            <FormattedMessage id="dsop.ingendata" />
          </AlertStripeInfo>
        </div>
      )}
    </div>
  );
};

export default DsopHistorikkView;
