import { Accordion, BodyLong } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import type { MedlInnslag } from "@/types/medl";
import medlStyles from "./MedlHistorikk.module.css";
import Periode from "./Periode";

interface Props {
    tittelId: string;
    tittelIdIngress: string;
    perioder: MedlInnslag[];
}

const Panel = (props: Props) => {
    const { perioder } = props;
    const { tittelId, tittelIdIngress } = props;
    return (
        <Accordion className={medlStyles.space}>
            <Accordion.Item>
                <Accordion.Header>
                    <FormattedMessage id={tittelId} />
                </Accordion.Header>
                <Accordion.Content>
                    <BodyLong>
                        <FormattedMessage id={tittelIdIngress} />
                    </BodyLong>
                    <div className={medlStyles.flexTable}>
                        {perioder.map((periode, i) => (
                            <Periode key={i} periode={periode} />
                        ))}
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Panel;
