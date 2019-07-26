import React, { MouseEvent, useEffect } from "react";
import { fetchDsopInfo } from "../../clients/apiClient";
import Error, { HTTPError } from "../../components/error/Error";
import { useStore } from "../../providers/Provider";
import { DsopInfo } from "../../types/dsop";
import arbeidsforholdIkon from "../../assets/img/Arbeidsforhold.svg";
import { HashLink as Link } from "react-router-hash-link";
import { basePath } from "../../App";
import { VenstreChevron } from "nav-frontend-chevron";
import { Systemtittel, Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import Icon from "../../components/icon/Icon";
import Moment from "react-moment";
import PanelBase from "nav-frontend-paneler";
import { RouteComponentProps, withRouter } from "react-router";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Spinner from "../../components/spinner/Spinner";

export type FetchDsopInfo =
  | { status: "LOADING" }
  | { status: "RESULT"; data: DsopInfo }
  | { status: "ERROR"; error: HTTPError };

const DsopHistorikk = (props: RouteComponentProps) => {
  const [{ dsopInfo }, dispatch] = useStore();
  const { history } = props;

  useEffect(() => {
    if (dsopInfo.status === "LOADING") {
      fetchDsopInfo()
        .then(dsopInfo =>
          dispatch({
            type: "SETT_DSOP_INFO_RESULT",
            payload: dsopInfo as DsopInfo
          })
        )
        .catch((error: HTTPError) =>
          dispatch({ type: "SETT_DSOP_INFO_ERROR", payload: error })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = (event: MouseEvent): void => {
    event.preventDefault();
    history.goBack();
  };

  switch (dsopInfo.status) {
    case "LOADING":
      return <Spinner />;

    case "RESULT":
      return (
        <div className="da__container">
          <div className="da__icon">
            <Icon
              backgroundImage={arbeidsforholdIkon}
              backgroundColor="#99C1E9"
            />
          </div>
          <div className="da__rad">
            <div className="da__back">
              <Link to={`${basePath}/`} onClick={goBack}>
                <VenstreChevron />
                Tilbake
              </Link>
            </div>
            <div className="da__overskrift">
              <Systemtittel>
                <FormattedMessage id="dsop.tittel" />
              </Systemtittel>
            </div>
            <div className="da__filler" />
          </div>
          <PanelBase border={true} className="da__innhold">
            <div className="historikk__tabs-innhold historikk__flex-table">
              {dsopInfo.data.length > 0 ? (
                <>
                  <div className="historikk__flex-rad historikk__head">
                    <div className="historikk__flex-kolonne">
                      <Element>Uthentingstidspunkt</Element>
                    </div>
                    <div className="historikk__flex-kolonne">
                      <Element>Mottaker</Element>
                    </div>
                  </div>
                  {dsopInfo.data.map((dsopInnslag, i) => (
                    <div className="historikk__flex-rad" key={i}>
                      <div className="historikk__flex-kolonne historikk__heading">
                        <Moment format="DD.MM.YYYY hh:mm:ss">
                          {dsopInnslag.uthentingsTidspunkt}
                        </Moment>
                      </div>
                      <div className="historikk__flex-kolonne">
                        {dsopInnslag.mottaker}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="historikk__ingen-data">
                  <AlertStripeInfo>Ingen data</AlertStripeInfo>
                </div>
              )}
            </div>
          </PanelBase>
        </div>
      );
    case "ERROR":
      return <Error error={dsopInfo.error} />;
  }
};

export default withRouter(DsopHistorikk);
