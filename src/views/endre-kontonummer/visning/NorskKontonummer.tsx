import ListElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import type { Language } from "@/language/language";
import { text } from "@/views/forside/utbetalinger/utbetalingerText";
import { formatterKontonr } from "@/views/forside/utbetalinger/utbetalingerUtils";

interface Props {
    kontonummer?: string;
    language: Language;
}

const NorskKontonummer = ({ kontonummer, language }: Props) => {
    return kontonummer ? (
        <Liste>
            <ListElement tittel={text.kontonr[language]} content={formatterKontonr(kontonummer)} language={language} />
        </Liste>
    ) : null;
};

export default NorskKontonummer;
