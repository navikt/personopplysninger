import { Heading } from "@navikt/ds-react";
import { FormattedMessage } from "react-intl";
import { useStore } from "@/store/Context";
import TelefonnummerHosNav from "./TelefonnummerHosNav";

const Telefonliste = () => {
    const [{ personInfo }] = useStore();
    const tlfnr = personInfo.status === "RESULT" ? personInfo.data.personalia?.tlfnr : undefined;
    const hasTelefon = !!(tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ));

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
