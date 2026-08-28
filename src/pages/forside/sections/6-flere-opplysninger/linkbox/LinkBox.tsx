import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Label } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import Icon from "@/components/icon/Icon";
import styles from "./LinkBox.module.css";

export interface Props {
    id: string;
    tittel: string;
    beskrivelse: string;
    lenkeTekst: string;
    icon?: string;
    to: string;
    component: "a" | "Link";
}

const Box = (props: Props) => {
    return (
        <>
            <div className={`${styles.iconContainer} icon__container`}>
                <Icon backgroundImage={props.icon} ariaHidden={true} />
            </div>
            <div className={styles.content}>
                <div className={styles.seksjon}>
                    <div className={styles.tittel}>
                        <div className={styles.lenke}>
                            <Label as="div">
                                <FormattedMessage id={props.tittel} />
                            </Label>
                        </div>
                    </div>
                    <div className={styles.beskrivelse}>
                        <BodyLong>
                            <FormattedMessage id={props.beskrivelse} />
                        </BodyLong>
                    </div>
                </div>
            </div>
            <ChevronRightIcon className={styles.next} aria-hidden="true" />
        </>
    );
};

const LinkBox = (props: Props) => {
    switch (props.component) {
        case "Link":
            return (
                <Link className={styles.rad} to={props.to}>
                    <Box {...props} />
                </Link>
            );
        case "a":
            return (
                <a className={styles.rad} href={props.to}>
                    <Box {...props} />
                </a>
            );
        default:
            return <Box {...props} />;
    }
};

export default LinkBox;
