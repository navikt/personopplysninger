import type { Language } from "@/language/language";
import type { Adresser } from "@/types/adresser";
import AndreAdresser from "./AndreAdresser";

interface Props {
    adresser?: Adresser;
    hentPaaNytt: () => Promise<void>;
    language: Language;
}

const AndreAdresserVisning = ({ adresser, hentPaaNytt, language }: Props) => {
    const kontaktadressePdl = adresser?.kontaktadresser.find((adr) => adr.kilde === "pdl");
    const oppholdsadressePdl = adresser?.oppholdsadresser?.find((adr) => adr.kilde === "pdl");

    if (!(kontaktadressePdl ?? oppholdsadressePdl)) {
        return null;
    }

    return <AndreAdresser kontaktadresse={kontaktadressePdl} oppholdsadresse={oppholdsadressePdl} hentPaaNytt={hentPaaNytt} language={language} />;
};

export default AndreAdresserVisning;
