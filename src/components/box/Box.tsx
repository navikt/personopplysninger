import { GuidePanel, Heading } from "@navikt/ds-react";
import type React from "react";
import { FormattedMessage } from "react-intl";
import { AnchorLink } from "@/components/anchorlink/AnchorLink";
import Infotekst from "@/components/infotekst/Infotekst";
import styles from "./Box.module.css";

interface Props {
    id: string;
    tittel: string;
    visAnkerlenke?: boolean;
    beskrivelse?: string;
    icon?: string;
    children: React.ReactNode;
}

const Box = (props: Props) => {
    const { tittel, beskrivelse, icon, children, id, visAnkerlenke } = props;
    const Veileder = <img src={icon} alt="" />;

    return (
        <div className={styles.wrapper} id={id}>
            <GuidePanel illustration={Veileder} poster>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div className={styles.titleContainer}>
                            <div className={styles.line} />
                            {tittel && (
                                <Heading size={"medium"} level={"2"} className={styles.title}>
                                    <FormattedMessage id={tittel} />
                                </Heading>
                            )}
                            {beskrivelse && <Infotekst overskriftID={tittel} beskrivelseID={beskrivelse} />}
                            <div className={styles.line} />
                        </div>
                        {visAnkerlenke && <AnchorLink id={id} />}
                    </div>
                    {children}
                </div>
            </GuidePanel>
        </div>
    );
};

export default Box;
