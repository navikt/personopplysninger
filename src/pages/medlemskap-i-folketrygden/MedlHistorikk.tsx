import React, { useEffect } from "react";
import { MedlInfo } from "types/medl";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import PageContainer from "components/pagecontainer/PageContainer";
import WithMEDL from "./MedlFetch";

interface Props {
  medlInfo: MedlInfo;
}

/*
  Hent data
  Obs! Merk at listen består av
  unntak fra Unntak fra medlemskap i folketrygden
*/

const MedlHistorikk = () => (
  <PageContainer
    tittelId={"medl.tittel"}
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

  return (
    <div className="historikk__tabs-innhold historikk__flex-table">
      {medlInfo.length > 0 ? (
        medlInfo.map((innslag, i) => (
          <div className="historikk__flex-rad" key={i}>
            <div className="historikk__flex-kolonne historikk__heading">
              <Moment format="DD.MM.YY">{innslag.fraOgMed}</Moment>
              {" - "}
              <Moment format="DD.MM.YY">{innslag.tilOgMed}</Moment>
            </div>
            <div className="historikk__flex-kolonne">
              <Link
                to={`${location.pathname}/${innslag.unntakId}`}
                className="lenke"
              >
                {innslag.grunnlag}
                <div />
              </Link>
            </div>
          </div>
        ))
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
