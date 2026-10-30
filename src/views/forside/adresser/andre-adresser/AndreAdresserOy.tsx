import { useState } from "react";
import { fetchPersonInfo } from "@/clients/apiClient";
import type { Language } from "@/language/language";
import type { Adresser } from "@/types/adresser";
import type { PersonInfo } from "@/types/personInfo";
import { setKlientConfig } from "@/utils/klientConfig";
import AndreAdresserVisning from "./AndreAdresserVisning";

interface Props {
    language: Language;
    adresser: Adresser;
    apiUrl: string;
    appUrl: string;
    loginUrl: string;
}

const AndreAdresserOy = (props: Props) => {
    const { language, apiUrl, appUrl, loginUrl } = props;
    const [adresser, settAdresser] = useState<Adresser | undefined>(props.adresser);

    if (typeof window !== "undefined") {
        setKlientConfig({ apiUrl, appUrl, loginUrl });
    }

    const hentPaaNytt = () => fetchPersonInfo().then((info: PersonInfo) => settAdresser(info.adresser));

    return <AndreAdresserVisning adresser={adresser} hentPaaNytt={hentPaaNytt} language={language} />;
};

export default AndreAdresserOy;
