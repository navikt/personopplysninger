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
            <FormattedHTMLMessage id={props.lenkeTekst} />
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
          </Normaltekst>
        </Link>
      );
    case "EKSTERN":
      return (
        <Lenke href={props.lenke}>
          <Normaltekst className="kilde__lenke">
            <FormattedHTMLMessage id={props.lenkeTekst} />
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
          </Normaltekst>
        </Lenke>
      );
    case "KNAPP":
      return (
        <div onClick={props.onClick}>
          <Normaltekst className="kilde__lenke lenke">
            <FormattedHTMLMessage id={props.lenkeTekst} />
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
          </Normaltekst>
        </div>
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
        <div className="kilde__seksjon">
          {props.kilde && (
            <EtikettLiten>
              <FormattedHTMLMessage id={props.kilde} />
            </EtikettLiten>
          )}
        </div>
        <div className="kilde__seksjon kilde__lenke-container">
          <Knapp {...props} />
        </div>
      </div>
      <hr className="kilde__linje" />
    </>
  );
};

export default Kilde;
