import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Element, Normaltekst } from "nav-frontend-typografi";
import moment from "moment";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import Moment from "react-moment";
import { FormattedMessage } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import { InstInfo } from "types/inst";
import Kilde from "../../../components/kilde/Kilde";
import { Flatknapp } from "nav-frontend-knapper";
import PilNed from "assets/img/PilNed.svg";
import Hjelpetekst from "nav-frontend-hjelpetekst";

const Tabell = (props: { instInfo: InstInfo }) => {
  const [viewAmount, setViewAmount] = useState(20);
  const location = useLocation();
  const { instInfo } = props;

  let animateDelay = 0;
  let animateDelayKey = 0;
  let animateDelaySum = 0;

  // @ts-ignore
  return (
    <div className="arbeidsforhold__disclaimer">
      <AlertStripeInfo>
        <Normaltekst>
          <FormattedMessage id="inst.disclaimer" />
        </Normaltekst>
      </AlertStripeInfo>
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
                            <Hjelpetekst>
                              <FormattedMessage id={"inst.fiktivSluttdato"} />
                            </Hjelpetekst>
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
            <AlertStripeInfo>
              <FormattedMessage id="inst.ingendata" />
            </AlertStripeInfo>
          </div>
        )}
        {instInfo.length > 20 && instInfo.length >= viewAmount && (
          <div className={"inst__se-flere"}>
            <Flatknapp onClick={() => setViewAmount(viewAmount + 20)}>
              <span>
                <Normaltekst>Se flere</Normaltekst>
              </span>
              <img
                alt={"Se flere ikon"}
                className={"inst__se-flere-icon"}
                src={PilNed}
              />
            </Flatknapp>
          </div>
        )}
      </div>
      <div className="inst__kilde">
        <Kilde kilde="inst.kilde" lenkeType="INGEN" />
      </div>
    </div>
  );
};

export default Tabell;
