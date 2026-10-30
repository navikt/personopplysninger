import { Heading } from "@navikt/ds-react";
import type { Language } from "@/language/language";
import type { Tlfnr } from "@/types/personalia";
import { text } from "@/views/forside/kontaktinfo/kontaktinfoText";
import TelefonnummerHosNav from "./TelefonnummerHosNav";

interface Props {
    tlfnr?: Tlfnr;
    medOverskrift: boolean;
    hentPaaNytt: () => Promise<void>;
    language: Language;
}

const Telefonliste = ({ tlfnr, medOverskrift, hentPaaNytt, language }: Props) => {
    const hasTelefon = !!(tlfnr && (tlfnr.telefonHoved || tlfnr.telefonAlternativ));

    if (!medOverskrift) {
        return <TelefonnummerHosNav tlfnr={tlfnr} hentPaaNytt={hentPaaNytt} language={language} />;
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
                <TelefonnummerHosNav tlfnr={tlfnr} hentPaaNytt={hentPaaNytt} language={language} />
            </div>
        </>
    );
};

export default Telefonliste;
