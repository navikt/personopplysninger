import type { Language } from "@/language/language";
import { useStore } from "@/store/Context";
import AndreAdresser from "./AndreAdresser";

interface Props {
    language: Language;
}

const AndreAdresserVisning = ({ language }: Props) => {
    const [{ personInfo }] = useStore();

    const adresser = personInfo.status === "RESULT" ? personInfo.data.adresser : undefined;
    const kontaktadressePdl = adresser?.kontaktadresser.find((adr) => adr.kilde === "pdl");
    const oppholdsadressePdl = adresser?.oppholdsadresser?.find((adr) => adr.kilde === "pdl");

    if (!(kontaktadressePdl ?? oppholdsadressePdl)) {
        return null;
    }

    return <AndreAdresser kontaktadresse={kontaktadressePdl} oppholdsadresse={oppholdsadressePdl} language={language} />;
};

export default AndreAdresserVisning;
