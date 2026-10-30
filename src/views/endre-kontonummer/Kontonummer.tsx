import { PencilIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import Kilde from "@/components/kilde/Kilde";
import type { Language } from "@/language/language";
import { text as felles } from "@/language/text";
import type { UtenlandskBankkonto } from "@/types/personalia";
import { text } from "@/views/forside/utbetalinger/utbetalingerText";
import KontonummerForm from "./endring/KontonummerForm";
import NorskKontonummer from "./visning/NorskKontonummer";
import Utenlandskonto from "./visning/UtenlandsBankkonto";

interface Props {
    kontonr?: string;
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
    language: Language;
}

const Kontonummer = ({ kontonr, utenlandskbank, personident, language }: Props) => {
    const [opprettEllerEndre, settOpprettEllerEndre] = useState(false);

    return opprettEllerEndre ? (
        <KontonummerForm
            utenlandskbank={utenlandskbank}
            personident={personident}
            kontonr={kontonr}
            settOpprettEllerEndre={settOpprettEllerEndre}
            language={language}
        />
    ) : (
        <>
            {kontonr || utenlandskbank ? (
                <>
                    <NorskKontonummer kontonummer={kontonr} language={language} />
                    <Utenlandskonto utenlandskBankkonto={utenlandskbank} language={language} />
                </>
            ) : (
                <div className="underseksjon__beskrivelse">
                    {text.ingenKontonr1[language]}
                    <br />
                    {text.ingenKontonr2[language]}
                </div>
            )}
            <Kilde
                kilde={felles.kildeNav[language]}
                onClick={() => settOpprettEllerEndre(true)}
                lenkeTekst={kontonr || utenlandskbank ? felles.endre[language] : felles.leggTil[language]}
                lenkeType={"KNAPP"}
                ikon={PencilIcon}
            />
        </>
    );
};

export default Kontonummer;
