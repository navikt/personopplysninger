import type { Language } from "@/language/language";
import type { UtenlandskBankkonto } from "@/types/personalia";
import { setKlientConfig } from "@/utils/klientConfig";
import Kontonummer from "./Kontonummer";

interface Props {
    language: Language;
    kontonr?: string;
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
    apiUrl: string;
    appUrl: string;
    loginUrl: string;
    endreKontonummerUrl: string;
}

const KontonummerOy = ({ language, kontonr, utenlandskbank, personident, apiUrl, appUrl, loginUrl, endreKontonummerUrl }: Props) => {
    if (typeof window !== "undefined") {
        setKlientConfig({ apiUrl, appUrl, loginUrl, endreKontonummerUrl });
    }

    return <Kontonummer kontonr={kontonr} utenlandskbank={utenlandskbank} personident={personident} language={language} />;
};

export default KontonummerOy;
