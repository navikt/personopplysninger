import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Element, Normaltekst } from "nav-frontend-typografi";
import moment from "moment";
import Moment from "react-moment";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { InstInfo } from "types/inst";
import PageContainer from "components/pagecontainer/PageContainer";
import INSTIkon from "assets/img/Institusjonsopphold.svg";
import WithInst from "./InstFetch";
import Kilde from "../../components/kilde/Kilde";
import PilNed from "assets/img/PilNed.svg";
import { Alert, Button } from "@navikt/ds-react";
import { CustomHelpText } from "components/customHelpText/CustomHelpText";

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
  const [viewAmount, setViewAmount] = useState(20);
  const location = useLocation();
  const { instInfo } = props;

  let animateDelay = 0;
  let animateDelayKey = 0;
  let animateDelaySum = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // @ts-ignore
  return (
    <div className="arbeidsforhold__disclaimer">
      <Alert variant="info">
        <Normaltekst>
          <FormattedMessage id="inst.disclaimer" />
        </Normaltekst>
      </Alert>
      <div className={"inst__tabell"}>
        {instInfo.length > 0 ? (
          <>
            <div className="historikk__flex-rad inst__head">
              <div className="historikk__flex-kolonne">
                <Element>
                  <FormattedMessage id="inst.periode" />
                </Element>
              </div>
              <div className="historikk__flex-kolonne">
                <Element>
                  <FormattedMessage id="inst.institusjon" />
                </Element>
              </div>
            </div>
            <TransitionGroup>
              {instInfo
                .sort((a, b) =>
                  moment(a.startdato) > moment(b.startdato) ? -1 : 1
                )
                .slice(0, viewAmount)
                .map((innslag, i) => {
                  if (animateDelayKey >= 20) {
                    animateDelay = 0;
                    animateDelayKey = 0;
                    animateDelaySum = 0;
                  }
                  animateDelay = 50 + animateDelayKey * 15;
                  animateDelaySum = +animateDelay;
                  animateDelayKey++;

                  return (
                    <CSSTransition
                      key={i}
                      classNames={"inst__animate"}
                      style={{
                        transitionDelay: `${animateDelay}ms`,
                        fontWeight:
                          i >= 20 && i >= viewAmount - 20 ? "bold" : "normal",
                      }}
                      timeout={100 + animateDelaySum}
                    >
                      <div className="historikk__flex-rad">
                        <div className="historikk__flex-kolonne historikk__heading">
                          <Moment format="DD.MM.YYYY">
                            {innslag.startdato}
                          </Moment>
                          {` - `}
                          {innslag.faktiskSluttdato && (
                            <Moment format="DD.MM.YYYY">
                              {innslag.faktiskSluttdato}
                            </Moment>
                          )}
                          {innslag.fiktivSluttdato && (
                            <CustomHelpText>
                              <FormattedMessage id={"inst.fiktivSluttdato"} />
                            </CustomHelpText>
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
                    </CSSTransition>
                  );
                })}
            </TransitionGroup>
          </>
        ) : (
          <div className="historikk__ingen-data">
            <Alert variant="info">
              <FormattedMessage id="inst.ingendata" />
            </Alert>
          </div>
        )}
        {instInfo.length > 20 && instInfo.length >= viewAmount && (
          <div className={"inst__se-flere"}>
            <Button
              variant={"tertiary"}
              onClick={() => setViewAmount(viewAmount + 20)}
            >
              <span>
                <Normaltekst>Se flere</Normaltekst>
              </span>
              <img
                alt={"Se flere ikon"}
                className={"inst__se-flere-icon"}
                src={PilNed}
              />
            </Button>
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
