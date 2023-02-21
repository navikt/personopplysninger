import React, { Fragment, useState } from "react";
import { DsopInfo } from "types/dsop";
import { FormattedMessage } from "react-intl";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { Alert, Label, Link } from "@navikt/ds-react";
import { Collapse, Expand } from "@navikt/ds-icons";
import dayjs from "dayjs";

interface Props {
  dsopInfo: DsopInfo;
}

export const DsopHistorikkView = (props: Props) => {
  const location = useLocation();
  const { dsopInfo } = props;

  const initState: {
    [year: string]: {
      innslag: DsopInfo;
      ekspandert: boolean;
    };
  } = {};

  dsopInfo.forEach((innslag, i) => {
    const year = dayjs(innslag.uthentingsTidspunkt).year();

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
            <Alert variant="info">
              <FormattedMessage
                id={"lenker.dsop.info"}
                values={{
                  a: (text) => (
                    <Link href="https://altinn.no" target="blank">
                      {text}
                    </Link>
                  ),
                }}
              />
            </Alert>
          </div>
          <div className="historikk__flex-rad historikk__head">
            <div className="historikk__flex-kolonne">
              <Label as="p">
                <FormattedMessage id="dsop.uthentingstidspunkt" />
              </Label>
            </div>
            <div className="historikk__flex-kolonne">
              <Label as="p">
                <FormattedMessage id="dsop.mottaker" />
              </Label>
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
                      {year} {value.ekspandert ? <Collapse /> : <Expand />}
                    </div>
                    <div />
                  </div>
                  {value.ekspandert &&
                    value.innslag.map((innslag, i) => (
                      <div className="historikk__flex-rad" key={i}>
                        <div className="historikk__flex-kolonne historikk__heading">
                          {dayjs(innslag.uthentingsTidspunkt).format(
                            "DD.MM kl. hh:mm"
                          )}
                        </div>
                        <div className="historikk__flex-kolonne">
                          <Link
                            as={ReactLink}
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
          <Alert variant="info">
            <FormattedMessage id="dsop.ingendata" />
          </Alert>
        </div>
      )}
    </div>
  );
};

export default DsopHistorikkView;
