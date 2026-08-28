import { CalendarIcon } from "@navikt/aksel-icons";
import { BodyLong } from "@navikt/ds-react";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import ListElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import type { MedlInnslag } from "@/types/medl";
import styles from "./MedlHistorikk.module.css";

interface Props {
    periode: MedlInnslag;
}

const Periode = (props: Props) => {
    const { periode } = props;
    return (
        <div className={styles.flexRad}>
            <div className={styles.flexKolonne}>
                <div className={styles.heading}>
                    <CalendarIcon className={styles.kalender} aria-hidden="true" />
                    <BodyLong>
                        <FormattedMessage id={"medl.periode"} /> {dayjs(periode.fraOgMed).format("DD.MM.YY")}
                        {" - "}
                        {dayjs(periode.tilOgMed).format("DD.MM.YY")}
                    </BodyLong>
                </div>
                <div className={`${styles.flexGrid} box__content`}>
                    <Liste>
                        <ListElement titleId="medl.hjemmel" content={periode.hjemmel} hjelpetekstId={"medl.hjemmel.hjelpetekst"} />
                        <ListElement titleId="medl.trygdedekning" content={periode.trygdedekning} hjelpetekstId={"medl.trygdedekning.hjelpetekst"} />
                        <ListElement
                            className={styles.land}
                            titleId="medl.lovvalgsland"
                            content={periode.lovvalgsland}
                            hjelpetekstId={"medl.lovvalgsland.hjelpetekst"}
                        />
                        <ListElement className={styles.land} titleId="medl.statsborgerland" content={periode.studieinformasjon?.statsborgerland} />
                        <ListElement className={styles.land} titleId="medl.studieland" content={periode.studieinformasjon?.studieland} />
                    </Liste>
                </div>
            </div>
        </div>
    );
};

export default Periode;
