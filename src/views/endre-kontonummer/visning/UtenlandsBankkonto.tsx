import { BodyShort } from "@navikt/ds-react";
import { friendlyFormatIBAN } from "ibantools";
import ListeElement from "@/components/listelement/ListElement";
import { Liste } from "@/components/listelement/Liste";
import type { Language } from "@/language/language";
import type { UtenlandskBankkonto } from "@/types/personalia";
import GateAdresse from "@/views/forside/sections/4-personinfo/3-adresser/komponenter/GateAdresse";
import { text } from "@/views/forside/utbetalinger/utbetalingerText";

interface Props {
    utenlandskBankkonto?: UtenlandskBankkonto;
    language: Language;
}

const Utenlandskonto = ({ utenlandskBankkonto, language }: Props) => {
    return utenlandskBankkonto ? (
        <Liste>
            <ListeElement
                tittel={text.bank[language]}
                content={
                    <>
                        {utenlandskBankkonto.banknavn && <BodyShort>{utenlandskBankkonto.banknavn}</BodyShort>}
                        <GateAdresse
                            adresse1={utenlandskBankkonto.adresse1}
                            adresse2={utenlandskBankkonto.adresse2}
                            adresse3={utenlandskBankkonto.adresse3}
                        />
                        {utenlandskBankkonto.land && <BodyShort>{utenlandskBankkonto.land}</BodyShort>}
                    </>
                }
                language={language}
            />
            {utenlandskBankkonto.kontonummer ? (
                <ListeElement tittel={text.kontonrEllerIban[language]} content={utenlandskBankkonto.kontonummer} language={language} />
            ) : utenlandskBankkonto.iban ? (
                <ListeElement tittel={text.iban[language]} content={friendlyFormatIBAN(utenlandskBankkonto.iban)} language={language} />
            ) : null}
            <ListeElement tittel={text.bankkode[language]} content={utenlandskBankkonto.bankkode} language={language} />
            <ListeElement tittel={text.valuta[language]} content={utenlandskBankkonto.valuta} language={language} />
            <ListeElement tittel={text.bicKode[language]} content={utenlandskBankkonto.swiftkode} language={language} />
        </Liste>
    ) : null;
};

export default Utenlandskonto;
