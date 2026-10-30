import Oy from "@/components/astro/Oy";
import type { RuntimeConfig } from "@/config/runtimeConfig";
import type { Locale } from "@/store/Store";
import type { UtenlandskBankkonto } from "@/types/personalia";
import Kontonummer from "./Kontonummer";

interface Props {
    locale: Locale;
    config: RuntimeConfig;
    kontonr?: string;
    utenlandskbank?: UtenlandskBankkonto;
    personident?: { verdi: string; type: string };
}

const KontonummerOy = ({ locale, config, kontonr, utenlandskbank, personident }: Props) => (
    <Oy locale={locale} config={config} personInfo={{}}>
        <Kontonummer kontonr={kontonr} utenlandskbank={utenlandskbank} personident={personident} language={locale} />
    </Oy>
);

export default KontonummerOy;
