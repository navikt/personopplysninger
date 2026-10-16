import { BodyShort, Heading, HelpText } from "@navikt/ds-react";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import boxStyles from "@/components/box/Box.module.css";
import ListElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import detaljerStyles from "@/styles/detaljer.module.css";
import type { InstInnslag } from "@/types/inst";
import { formatOrgnr, RADIX_DECIMAL } from "@/utils/formattering";
import instStyles from "../Inst.module.css";

const InstDetaljerView = (props: { innslag: InstInnslag }) => {
    const { innslag } = props;
    const startdato = dayjs(innslag.startdato).format("DD.MM.YYYY");
    const faktiskSluttdato = innslag.faktiskSluttdato ? dayjs(innslag.faktiskSluttdato).format("DD.MM.YYYY") : "";

    return (
        <div>
            <div className={detaljerStyles.tittel}>
                <Heading level="2" size="small">
                    {innslag.institusjonsnavn}
                </Heading>
                {innslag.organisasjonsnummer && (
                    <BodyShort>
                        <FormattedMessage
                            id="side.organisasjonsnummer"
                            values={{
                                orgnr: formatOrgnr(parseInt(innslag.organisasjonsnummer, RADIX_DECIMAL).toString()),
                            }}
                        />
                    </BodyShort>
                )}
            </div>
            <hr className={boxStyles.lineWide} />
            <div className="box">
                <div className="box__content">
                    <Liste>
                        <ListElement titleId={"inst.institusjonstype"} content={innslag.institusjonstype} />
                        <ListElement
                            titleId={"inst.periode"}
                            content={
                                <div className={instStyles.periode}>
                                    {`${startdato} - ${faktiskSluttdato}`}
                                    {innslag.fiktivSluttdato && (
                                        <HelpText>
                                            <FormattedMessage id={"inst.fiktivSluttdato"} />
                                        </HelpText>
                                    )}
                                </div>
                            }
                        />
                    </Liste>
                </div>
            </div>
        </div>
    );
};

export default InstDetaljerView;
