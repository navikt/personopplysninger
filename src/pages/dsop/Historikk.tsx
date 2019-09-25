import React, { useState, Fragment, useEffect } from "react";
import { DsopInfo } from "../../types/dsop";
import { Element } from "nav-frontend-typografi";
import moment from "moment";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

interface Props {
  dsopInfo: DsopInfo;
}

const DsopHistorikk = (props: Props & RouteComponentProps) => {
  const { dsopInfo } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initState: {
    [key: string]: {
      dsopInnslag: DsopInfo;
      ekspandert: boolean;
    };
  } = {};

  dsopInfo.forEach((dsopInnslag, i) => {
    const year = moment(dsopInnslag.uthentingsTidspunkt).year();

    if (!initState[year]) {
      initState[year] = {
        dsopInnslag: [dsopInnslag],
        ekspandert: !i ? true : false
      };
    } else {
      initState[year].dsopInnslag.push(dsopInnslag);
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
                    value.dsopInnslag.map((dsopInnslag, i) => (
                      <div className="historikk__flex-rad" key={i}>
                        <div className="historikk__flex-kolonne historikk__heading">
                          <Moment format="DD.MM - hh:mm">
                            {dsopInnslag.uthentingsTidspunkt}
                          </Moment>
                        </div>
                        <div className="historikk__flex-kolonne">
                          <Link
                            to={`${props.location.pathname}/${dsopInnslag.uthentingsTidspunkt}`}
                            className="lenke"
                          >
                            {dsopInnslag.mottaker}
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

export default withRouter(DsopHistorikk);
