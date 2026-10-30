import { Heading, ReadMore } from "@navikt/ds-react";
import { type ReactNode, useState } from "react";
import ListElement from "@/components/listelement/ListElement";
import type { Language } from "@/language/language";
import { text } from "@/views/forside/adresser/adresserText";
import adresseStyles from "../Adresser.module.css";

interface Props {
    tittel: string;
    bruksenhetsnummer?: string;
    kommune?: string;
    flyttedatoFormatert?: string;
    gyldigTilOgMedFormatert?: string;
    children: ReactNode;
    language: Language;
}

const AdressePanel = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleReadMore = () => {
        setIsOpen(!isOpen);
    };
    const readMoreLabel = isOpen ? text.skjulDetaljer[props.language] : text.visDetaljer[props.language];

    return (
        <div className={adresseStyles.box}>
            <div className="underseksjon__header">
                <Heading level={"4"} size={"xsmall"}>
                    {props.tittel}
                </Heading>
            </div>
            {props.children}
            {(props.bruksenhetsnummer ?? props.kommune ?? props.flyttedatoFormatert ?? props.gyldigTilOgMedFormatert) && (
                <ReadMore className={adresseStyles.lesmer} header={readMoreLabel} onClick={toggleReadMore}>
                    <dl>
                        {props.bruksenhetsnummer && (
                            <ListElement tittel={text.bolignummer[props.language]} content={props.bruksenhetsnummer} language={props.language} />
                        )}
                        {props.kommune && <ListElement tittel={text.kommune[props.language]} content={props.kommune} language={props.language} />}
                        {props.flyttedatoFormatert && (
                            <ListElement tittel={text.flyttedato[props.language]} content={props.flyttedatoFormatert} language={props.language} />
                        )}
                        {props.gyldigTilOgMedFormatert && (
                            <ListElement tittel={text.gyldigTil[props.language]} content={props.gyldigTilOgMedFormatert} language={props.language} />
                        )}
                    </dl>
                </ReadMore>
            )}
            <div className={adresseStyles.divider} />
        </div>
    );
};

export default AdressePanel;
