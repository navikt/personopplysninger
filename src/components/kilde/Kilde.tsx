import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { EtikettLiten, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import { Link } from "react-router-dom";

interface Props {
  kilde?: string;
  lenke?: string;
  lenkeTekst?: string;
  eksternLenke?: boolean;
  ikon?: string;
}

const Kilde = (props: Props) => {
  const { lenke, lenkeTekst, eksternLenke, ikon } = props;
  return (
    <div className="kilde__container">
      <div className="kilde__seksjon">
        {props.kilde && (
          <EtikettLiten>
            <FormattedHTMLMessage id={props.kilde} />
          </EtikettLiten>
        )}
      </div>
      <div className="kilde__seksjon kilde__lenke-container">
        {lenke && lenkeTekst && (
          <>
            {eksternLenke ? (
              <Lenke href={lenke}>
                <Normaltekst>
                  <FormattedHTMLMessage id={lenkeTekst} />
                  {ikon && (
                    <span className="kilde__icon">
                      <img src={ikon} alt="Ekstern lenke" />
                    </span>
                  )}
                </Normaltekst>
              </Lenke>
            ) : (
              <Link to={lenke}>
                <Normaltekst className="lenke">
                  <FormattedHTMLMessage id={lenkeTekst} />
                  {ikon && (
                    <span className="kilde__icon">
                      <img src={ikon} alt="Ekstern lenke" />
                    </span>
                  )}
                </Normaltekst>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Kilde;
