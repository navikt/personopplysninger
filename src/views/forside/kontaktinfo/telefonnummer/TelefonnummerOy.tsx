import { useState } from "react";
import { fetchPersonInfo } from "@/clients/apiClient";
import type { Language } from "@/language/language";
import type { Tlfnr } from "@/types/personalia";
import type { PersonInfo } from "@/types/personInfo";
import { setKlientConfig } from "@/utils/klientConfig";
import Telefonliste from "./Telefonliste";

interface Props {
    language: Language;
    tlfnr?: Tlfnr;
    medOverskrift: boolean;
    apiUrl: string;
    appUrl: string;
    loginUrl: string;
}

const TelefonnummerOy = (props: Props) => {
    const { language, medOverskrift, apiUrl, appUrl, loginUrl } = props;
    const [tlfnr, settTlfnr] = useState(props.tlfnr);

    if (typeof window !== "undefined") {
        setKlientConfig({ apiUrl, appUrl, loginUrl });
    }

    const hentPaaNytt = () => fetchPersonInfo().then((info: PersonInfo) => settTlfnr(info.personalia?.tlfnr));

    return <Telefonliste tlfnr={tlfnr} medOverskrift={medOverskrift} hentPaaNytt={hentPaaNytt} language={language} />;
};

export default TelefonnummerOy;
