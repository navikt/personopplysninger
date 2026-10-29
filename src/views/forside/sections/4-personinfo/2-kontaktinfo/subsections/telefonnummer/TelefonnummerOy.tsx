import Oy from "@/components/astro/Oy";
import type { RuntimeConfig } from "@/config/runtimeConfig";
import type { Locale } from "@/store/Store";
import type { Tlfnr } from "@/types/personalia";
import Telefonliste from "./Telefonliste";

interface Props {
    locale: Locale;
    config: RuntimeConfig;
    tlfnr?: Tlfnr;
}

const utenlandskbank = {
    adresse1: "",
    adresse2: "",
    adresse3: "",
    bankkode: "",
    banknavn: "",
    iban: "",
    kontonummer: "",
    land: "",
    swiftkode: "",
    valuta: "",
};

const TelefonnummerOy = ({ locale, config, tlfnr }: Props) => (
    <Oy locale={locale} config={config} personInfo={{ personalia: { kontoregisterStatus: "", utenlandskbank, tlfnr } }}>
        <Telefonliste />
    </Oy>
);

export default TelefonnummerOy;
