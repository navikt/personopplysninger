import React, { useState, Fragment, useEffect } from "react";
import { Element } from "nav-frontend-typografi";
import moment from "moment";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { InstInfo } from "../../types/inst";

interface Props {
  instInfo: InstInfo;
}

const InstHistorikk = (props: Props & RouteComponentProps) => {
  const { instInfo } = props;

  console.log(instInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initState: {
    [key: string]: {
      instInnslag: InstInfo;
      ekspandert: boolean;
    };
  } = {};

  instInfo.forEach((instInnslag, i) => {
    const year = moment(instInnslag.registreringstidspunkt).year();

    if (!initState[year]) {
      initState[year] = {
        instInnslag: [instInnslag],
        ekspandert: !i ? true : false
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
            <AlertStripeInfo>
              <FormattedHTMLMessage id={"eksternelenker.dsop.info"} />
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
                            to={`${props.location.pathname}/${instInnslag.registreringstidspunkt}`}
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
          <AlertStripeInfo>
            <FormattedMessage id="dsop.ingendata" />
          </AlertStripeInfo>
        </div>
      )}
    </div>
  );
};

export default withRouter(InstHistorikk);
