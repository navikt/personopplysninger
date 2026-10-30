import { Heading } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import { useStore } from "@/store/Context";
import TelefonnummerHosNav from "./TelefonnummerHosNav";

interface Props {
    medOverskrift: boolean;
}

const Telefonliste = ({ medOverskrift }: Props) => {
    const [{ personInfo }] = useStore();
    const tlfnr = personInfo.status === "RESULT" ? personInfo.data.personalia?.tlfnr : undefined;
    const hasTelefon = !!(tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ));

    if (!medOverskrift) {
        return <TelefonnummerHosNav tlfnr={tlfnr} />;
    }

    return (
        <>
            {hasTelefon && (
                <div className="underseksjon__header">
                    <Heading size="small" level="3">
                        <FormattedMessage id="personalia.tlfnr.oveskrift" />
                    </Heading>
                </div>
            )}
            <div>
                <TelefonnummerHosNav tlfnr={tlfnr} />
            </div>
        </>
    );
};

export default Telefonliste;
