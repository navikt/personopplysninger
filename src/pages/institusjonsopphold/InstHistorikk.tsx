import React, { useState, Fragment, useEffect } from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
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
import Kilde from "../../components/kilde/Kilde";
import Box from "../../components/box/Box";

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

  return (
    <div className="arbeidsforhold__disclaimer">
      <AlertStripeInfo>
        <Normaltekst>
          NAV viser registrerte opphold på alders- og sykehjem og andre
          helseinstitusjoner fra 16.9.2020. Opphold i fengsel vises ikke i denne
          versjonen av innsynstjenesten, men vi jobber med å videreutvikle
          løsningen slik at disse oppholdene også kan vises. Du kan be NAV om
          innsyn i eldre opphold og opphold i fengsel. Dersom det er feil i
          opplysninger, kontakt kilden.
        </Normaltekst>
      </AlertStripeInfo>
      <div className={"inst__tabell"}>
        {instInfo.length > 0 ? (
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
            {instInfo
              .sort((a, b) =>
                moment(a.startdato) > moment(b.startdato) ? -1 : 1
              )
              .map((innslag, i) => (
                <div className="historikk__flex-rad" key={i}>
                  <div className="historikk__flex-kolonne historikk__heading">
                    <Moment format="DD.MM.YYYY">{innslag.startdato}</Moment>
                    {` - `}
                    {innslag.faktiskSluttdato && (
                      <Moment format="DD.MM.YYYY">
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
          </>
        ) : (
          <div className="historikk__ingen-data">
            <AlertStripeInfo>
              <FormattedMessage id="inst.ingendata" />
            </AlertStripeInfo>
          </div>
        )}
      </div>
      <div className="inst__kilde">
        <Kilde kilde="inst.kilde" lenkeType="INGEN" />
      </div>
    </div>
  );
};

export default InstHistorikk;
