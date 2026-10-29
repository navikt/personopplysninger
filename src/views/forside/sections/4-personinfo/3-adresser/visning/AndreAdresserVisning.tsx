import { useStore } from "@/store/Context";
import AndreAdresser from "./AndreAdresser";

const AndreAdresserVisning = () => {
    const [{ personInfo }] = useStore();

    const adresser = personInfo.status === "RESULT" ? personInfo.data.adresser : undefined;
    const kontaktadressePdl = adresser?.kontaktadresser.find((adr) => adr.kilde === "pdl");
    const oppholdsadressePdl = adresser?.oppholdsadresser?.find((adr) => adr.kilde === "pdl");

    if (!(kontaktadressePdl ?? oppholdsadressePdl)) {
        return null;
    }

    return <AndreAdresser kontaktadresse={kontaktadressePdl} oppholdsadresse={oppholdsadressePdl} />;
};

export default AndreAdresserVisning;
