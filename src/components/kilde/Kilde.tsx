import React from "react";
import { FormattedMessage } from "react-intl";
import { Normaltekst, Undertekst } from "nav-frontend-typografi";
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
        <Normaltekst>
          <Link to={props.lenke} className="kilde__lenke lenke">
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
            <FormattedMessage id={props.lenkeTekst} />
          </Link>
        </Normaltekst>
      );
    case "EKSTERN":
      return (
        <Normaltekst>
          <Lenke href={props.lenke} className="kilde__lenke lenke">
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
            <FormattedMessage id={props.lenkeTekst} />
          </Lenke>
        </Normaltekst>
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
            <FormattedMessage id={props.lenkeTekst} />
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
            <Undertekst>
              <FormattedMessage
                id={props.kilde}
                values={{
                  span: (text: String) => (
                    <span style={{ textTransform: "none" }}>{text}</span>
                  ),
                  br: (text: String) => (
                    <>
                      <br />
                      {text}
                    </>
                  ),
                }}
              />
            </Undertekst>
          )}
        </div>
      </div>
    </>
  );
};

export default Kilde;
