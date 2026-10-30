import { BodyLong, Button, Detail, Link } from "@navikt/ds-react";
import type React from "react";
import styles from "./Kilde.module.css";

type IconType = React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>>;

type Props =
    | {
          kilde: string;
          lenkeType: "INGEN";
      }
    | {
          kilde: string;
          lenke: string;
          lenkeTekst: string;
          lenkeType: "EKSTERN";
          ikon?: IconType;
      }
    | {
          kilde: string;
          lenkeTekst: string;
          lenkeType?: "KNAPP";
          onClick: () => void;
          ikon?: IconType;
      };

const Icon = ({ icon: IconComponent }: { icon: IconType }) => <IconComponent aria-hidden="true" className={styles.iconAksel} />;

const Knapp = (props: Props) => {
    switch (props.lenkeType) {
        case "EKSTERN":
            return (
                <BodyLong>
                    <Link href={props.lenke}>
                        {props.ikon && (
                            <span className={styles.icon}>
                                <Icon icon={props.ikon} />
                            </span>
                        )}
                        {props.lenkeTekst}
                    </Link>
                </BodyLong>
            );
        case "KNAPP":
            return (
                <Button icon={props.ikon && <Icon icon={props.ikon} />} onClick={props.onClick} variant="tertiary" className={styles.knapp}>
                    {props.lenkeTekst}
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
            <div className={styles.tekst}>{props.kilde && <Detail spacing>{props.kilde}</Detail>}</div>
            <Knapp {...props} />
        </>
    );
};

export default Kilde;
