import { Box, Heading } from "@navikt/ds-react";
import type React from "react";
import { FormattedMessage } from "react-intl";
import Icon from "@/components/icon/Icon";
import Tilbake from "@/components/tilbake/Tilbake";
import Brodsmulesti, { type BrodsmuleLenke } from "@/views/forside/sections/2-brodsmulesti/Brodsmulesti";
import styles from "./PageContainer.module.css";

interface Props {
    children: React.ReactNode;
    tittelId: string;
    backTo: string;
    icon?: string;
    brodsmulesti: BrodsmuleLenke[];
}

const PageContainer = (props: Props) => {
    return (
        <div className={styles.container}>
            <Brodsmulesti hierarki={props.brodsmulesti} />
            {props.icon && (
                <div className={styles.icon}>
                    <Icon backgroundImage={props.icon} backgroundColor="#99C1E9" />
                </div>
            )}
            <div className={styles.headingRow}>
                <div className={styles.back}>
                    <Tilbake to={props.backTo} />
                </div>
                <div className={styles.heading}>
                    <Heading size={"medium"} level={"2"}>
                        <FormattedMessage id={props.tittelId} values={{ br: () => <br /> }} />
                    </Heading>
                </div>
                <div className={styles.filler} />
            </div>
            <Box background="surface-default" className={styles.content}>
                {props.children}
            </Box>
        </div>
    );
};

export default PageContainer;
