import { CalendarIcon } from "@navikt/aksel-icons";
import { BodyLong } from "@navikt/ds-react";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import ListElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import type { MedlInnslag } from "@/types/medl";
import medlStyles from "./MedlHistorikk.module.css";

interface Props {
    periode: MedlInnslag;
}

const Periode = (props: Props) => {
    const { periode } = props;
    return (
        <div className={medlStyles.flexRad}>
            <div className={medlStyles.flexKolonne}>
                <div className={medlStyles.heading}>
                    <CalendarIcon className={medlStyles.kalender} aria-hidden="true" />
                    <BodyLong>
                        <FormattedMessage id={"medl.periode"} /> {dayjs(periode.fraOgMed).format("DD.MM.YY")}
                        {" - "}
                        {dayjs(periode.tilOgMed).format("DD.MM.YY")}
                    </BodyLong>
                </div>
                <div className={`${medlStyles.flexGrid} box__content`}>
                    <Liste>
                        <ListElement titleId="medl.hjemmel" content={periode.hjemmel} hjelpetekstId={"medl.hjemmel.hjelpetekst"} />
                        <ListElement titleId="medl.trygdedekning" content={periode.trygdedekning} hjelpetekstId={"medl.trygdedekning.hjelpetekst"} />
                        <ListElement
                            className={medlStyles.land}
                            titleId="medl.lovvalgsland"
                            content={periode.lovvalgsland}
                            hjelpetekstId={"medl.lovvalgsland.hjelpetekst"}
                        />
                        <ListElement
                            className={medlStyles.land}
                            titleId="medl.statsborgerland"
                            content={periode.studieinformasjon?.statsborgerland}
                        />
                        <ListElement className={medlStyles.land} titleId="medl.studieland" content={periode.studieinformasjon?.studieland} />
                    </Liste>
                </div>
            </div>
        </div>
    );
};

export default Periode;
