import { Box, Heading, ReadMore } from "@navikt/ds-react";
import { Fragment } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import lenkerStyles from "../Lenker.module.css";
import styles from "./MerInformasjon.module.css";
import merInformasjon from "./MerInformasjonData";
import MerInformasjonPanelinnhold from "./MerInformasjonPanelinnhold";

const AlternativListe = () => {
    const { formatMessage: msg } = useIntl();

    return (
        <Box background="surface-default" className={lenkerStyles.panel}>
            <div className={styles.content}>
                <Heading size={"medium"} level={"2"}>
                    <FormattedMessage id="alternativer.tittel" />
                </Heading>
                {merInformasjon.map((info, i) => (
                    <Fragment key={i}>
                        <ReadMore key={info.id} header={msg({ id: info.tittel })}>
                            <MerInformasjonPanelinnhold melding={info.melding} />
                        </ReadMore>
                    </Fragment>
                ))}
            </div>
        </Box>
    );
};

export default AlternativListe;
