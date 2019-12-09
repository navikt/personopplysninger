import React, { useState, Fragment, useEffect } from "react";
import { MedlInfo } from "types/medl";
import { Element } from "nav-frontend-typografi";
import moment from "moment";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import PageContainer from "components/pagecontainer/PageContainer";
import DSOPIkon from "assets/img/DSOP.svg";
import WithMEDL from "./MedlFetch";

interface Props {
  medlInfo: MedlInfo;
}

/*
  Hent data
*/
const MedlHistorikk = () => (
  <PageContainer
    tittelId={"medl.tittel"}
    icon={DSOPIkon}
    backTo={"/"}
    brodsmulesti={[{ title: "medl.tittel" }]}
  >
    <WithMEDL>{({ data }) => <Tabell medlInfo={data} />}</WithMEDL>
  </PageContainer>
);

/*
  Visning
*/
const Tabell = (props: Props) => {
  const location = useLocation();
  const { medlInfo } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initState: {
    [år: string]: {
      dsopInnslag: MedlInfo;
      ekspandert: boolean;
    };
  } = {};

  medlInfo.forEach((dsopInnslag, i) => {
    const year = moment(dsopInnslag.uthentingsTidspunkt).year();

    if (!initState[year]) {
      initState[year] = {
        dsopInnslag: [dsopInnslag],
        ekspandert: !i
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
                            to={`${location.pathname}/${dsopInnslag.uthentingsTidspunkt}`}
                            className="lenke"
                          >
                            {
                              // Todo: Implementer visning
                            }
                            <div />
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
            <FormattedMessage id="medl.ingendata" />
          </AlertStripeInfo>
        </div>
      )}
    </div>
  );
};

export default MedlHistorikk;
