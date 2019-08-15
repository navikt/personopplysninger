import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { EtikettLiten, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import pencilIcon from "../../assets/img/Pencil.svg";
import externalLinkIcon from "../../assets/img/Link.svg";
import { Link } from "react-router-dom";

interface Props {
  kilde?: string;
  lenke?: string;
  lenkeTekst?: string;
  eksternLenke?: boolean;
}

const Kilde = (props: Props) => {
  const { lenke, lenkeTekst, eksternLenke } = props;
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
                  <span className="kilde__icon">
                    <img src={externalLinkIcon} alt="Ekstern lenke" />
                  </span>
                </Normaltekst>
              </Lenke>
            ) : (
              <Link to={lenke}>
                <Normaltekst className="lenke">
                  <FormattedHTMLMessage id={lenkeTekst} />
                  <span className="kilde__icon">
                    <img src={pencilIcon} alt="Endre" />
                  </span>
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
