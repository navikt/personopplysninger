import { BodyShort, Button, Heading } from "@navikt/ds-react";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import { FormattedMessage } from "react-intl";
import boxStyles from "@/components/box/Box.module.css";
import ListElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import detaljerStyles from "@/styles/detaljer.module.css";
import type { DsopDetaljInnslag } from "@/types/dsop";

interface Props {
    innslag: DsopDetaljInnslag;
}

const DsopDetaljerView = ({ innslag }: Props) => {
    const onClick = () => {
        const leverteData = JSON.parse(atob(innslag.leverteData));
        const fileContent = JSON.stringify(leverteData, null, 2);
        const fileBlob = new Blob([fileContent], {
            type: "application/json",
        });
        const fileName = "utleverte-data.json";
        FileSaver.saveAs(fileBlob, fileName);
    };

    return (
        <div>
            <div className={detaljerStyles.tittel}>
                <Heading level="2" size="small">
                    {innslag.mottakernavn}
                </Heading>
                <BodyShort>
                    <FormattedMessage id="side.organisasjonsnummer" values={{ orgnr: innslag.mottaker }} />
                </BodyShort>
            </div>
            <hr className={boxStyles.lineWide} />
            <div className="box">
                <div className="box__content">
                    <Liste>
                        <ListElement titleId={"dsop.uthentingstidspunkt"} content={dayjs(innslag.uthentingsTidspunkt).format("DD.MM.YYYY hh:mm")} />
                        <ListElement titleId={"dsop.personnummer"} content={innslag.person} />
                        <ListElement titleId={"dsop.tema"} content={innslag.tema} />
                    </Liste>
                </div>
                <div className={detaljerStyles.container}>
                    <Button variant="primary" onClick={onClick}>
                        <FormattedMessage id="dsop.lastned" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DsopDetaljerView;
