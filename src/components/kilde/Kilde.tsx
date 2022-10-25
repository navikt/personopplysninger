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
                <img src={props.ikon} alt="Ekstern lenke" />
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
                <img src={props.ikon} alt="Ekstern lenke" />
              </span>
            )}
            <FormattedMessage id={props.lenkeTekst} />
          </Link>
        </BodyLong>
      );
    case "KNAPP":
      return (
        <Button variant="tertiary" className="kilde__knapp knapp-med-ikon">
          {props.ikon && (
            <span className="kilde__icon">
              <img src={props.ikon} alt="Ekstern lenke" />
            </span>
          )}
          <BodyLong>
            <FormattedMessage id={props.lenkeTekst} />
          </BodyLong>
        </Button>
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
            <Detail>
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
            </Detail>
          )}
        </div>
      </div>
    </>
  );
};

export default Kilde;
