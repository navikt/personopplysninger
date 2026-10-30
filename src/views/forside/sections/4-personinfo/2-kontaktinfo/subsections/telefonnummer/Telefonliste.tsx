import { Heading } from "@navikt/ds-react";
import type { Language } from "@/language/language";
import { useStore } from "@/store/Context";
import { text } from "@/views/forside/kontaktinfo/kontaktinfoText";
import TelefonnummerHosNav from "./TelefonnummerHosNav";

interface Props {
    medOverskrift: boolean;
    language: Language;
}

const Telefonliste = ({ medOverskrift, language }: Props) => {
    const [{ personInfo }] = useStore();
    const tlfnr = personInfo.status === "RESULT" ? personInfo.data.personalia?.tlfnr : undefined;
    const hasTelefon = !!(tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ));

    if (!medOverskrift) {
        return <TelefonnummerHosNav tlfnr={tlfnr} language={language} />;
    }

    return (
        <>
            {hasTelefon && (
                <div className="underseksjon__header">
                    <Heading size="small" level="3">
                        {text.telefonOverskrift[language]}
                    </Heading>
                </div>
            )}
            <div>
                <TelefonnummerHosNav tlfnr={tlfnr} language={language} />
            </div>
        </>
    );
};

export default Telefonliste;
