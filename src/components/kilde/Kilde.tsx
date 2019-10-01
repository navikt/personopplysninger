import React from "react";
import { FormattedHTMLMessage } from "react-intl";
import { EtikettLiten, Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import { Link } from "react-router-dom";

type Props =
  | {
      kilde: string;
      lenkeType: "INGEN";
    }
  | {
      kilde: string;
      lenke: string;
      lenkeTekst: string;
      lenkeType: "INTERN" | "EKSTERN";
      ikon?: string;
    }
  | {
      kilde: string;
      lenkeTekst: string;
      lenkeType?: "KNAPP";
      onClick: () => void;
      ikon?: string;
    };

const Knapp = (props: Props) => {
  switch (props.lenkeType) {
    case "INTERN":
      return (
        <Link to={props.lenke}>
          <Normaltekst className="kilde__lenke lenke">
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
            <FormattedHTMLMessage id={props.lenkeTekst} />
          </Normaltekst>
        </Link>
      );
    case "EKSTERN":
      return (
        <Lenke href={props.lenke}>
          <Normaltekst className="kilde__lenke">
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
            <FormattedHTMLMessage id={props.lenkeTekst} />
          </Normaltekst>
        </Lenke>
      );
    case "KNAPP":
      return (
        <button onClick={props.onClick} className="kilde__lenke lenke">
          {props.ikon && (
            <span className="kilde__icon">
              <img src={props.ikon} alt="Ekstern lenke" />
            </span>
          )}
          <Normaltekst>
            <FormattedHTMLMessage id={props.lenkeTekst} />
          </Normaltekst>
        </button>
      );
    case "INGEN":
    default:
      return <></>;
  }
};

const Kilde = (props: Props) => {
  return (
    <>
      <div className="kilde__container">
        <Knapp {...props} />
        <div className="kilde__tekst">
          {props.kilde && (
            <EtikettLiten>
              <FormattedHTMLMessage id={props.kilde} />
            </EtikettLiten>
          )}
        </div>
      </div>
    </>
  );
};

export default Kilde;
