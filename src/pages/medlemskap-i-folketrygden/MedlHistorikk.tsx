import React, { useEffect } from "react";
import { MedlInfo } from "types/medl";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import PageContainer from "components/pagecontainer/PageContainer";
import MEDLIkon from "assets/img/MEDL.svg";
import WithMEDL from "./MedlFetch";
import { Element } from "nav-frontend-typografi";

/*
  import {
    EtikettAdvarsel,
    EtikettInfo,
    EtikettSuksess
  } from "nav-frontend-etiketter";
 */

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
    icon={MEDLIkon}
    backTo={"/#flere-opplysninger"}
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
              <Element>
                <Link
                  to={`${location.pathname}/${innslag.unntakId}`}
                  className="lenke"
                >
                  {innslag.grunnlag}
                </Link>
              </Element>
              <Moment format="DD.MM.YY">{innslag.fraOgMed}</Moment>
              {" - "}
              <Moment format="DD.MM.YY">{innslag.tilOgMed}</Moment>
            </div>
            {/*
             <div className="historikk__flex-kolonne">
                <span>
                  {
                    {
                      Avvist: <EtikettAdvarsel>Avvist</EtikettAdvarsel>,
                      Gyldig: <EtikettSuksess>Gyldig</EtikettSuksess>,
                      Uavklart: <EtikettInfo>Uavklart</EtikettInfo>
                    }[innslag.status]
                  }
                </span>
              </div>
               */}
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
