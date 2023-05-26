import React from "react";
import { FormattedMessage } from "react-intl";
import { Link as ReactLink } from "react-router-dom";
import { Link, BodyLong, Detail, Button } from "@navikt/ds-react";

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
        <BodyLong>
          <Link as={ReactLink} to={props.lenke} className="kilde__lenke lenke">
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="" />
              </span>
            )}
            <FormattedMessage id={props.lenkeTekst} />
          </Link>
        </BodyLong>
      );
    case "EKSTERN":
      return (
        <BodyLong>
          <Link href={props.lenke} className="kilde__lenke lenke">
            {props.ikon && (
              <span className="kilde__icon">
                <img src={props.ikon} alt="" />
              </span>
            )}
            <FormattedMessage id={props.lenkeTekst} />
          </Link>
        </BodyLong>
      );
    case "KNAPP":
      return (
        <Button
          onClick={props.onClick}
          variant="tertiary"
          className="kilde__knapp knapp-med-ikon"
        >
          {props.ikon && (
            <img className="kilde__icon" src={props.ikon} alt="" />
          )}
          <FormattedMessage id={props.lenkeTekst} />
        </Button>
      );
    case "INGEN":
    default:
      return null;
  }
};

const Kilde = (props: Props) => {
  return (
    <>
      <div className="kilde__container">
        <div className="kilde__tekst">
          {props.kilde && (
            <Detail>
              <FormattedMessage
                id={props.kilde}
                values={{
                  span: (text) => (
                    <span style={{ textTransform: "none" }}>{text}</span>
                  ),
                  br: (text) => (
                    <>
                      <br />
                      {text}
                    </>
                  ),
                }}
              />
            </Detail>
          )}
        </div>
        <Knapp {...props} />
      </div>
    </>
  );
};

export default Kilde;
