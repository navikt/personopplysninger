import dayjs from "dayjs";
import type { Language } from "@/language/language";
import type { Adresse as IAdresse } from "@/types/adresser/adresse";
import { text } from "@/views/forside/adresser/adresserText";
import AdressePanel from "../komponenter/AdressePanel";
import Matrikkeladresse from "./adressetyper/norske-adresser/Matrikkeladresse";
import PostadresseIFrittFormat from "./adressetyper/norske-adresser/PostadresseIFrittFormat";
import Postboksadresse from "./adressetyper/norske-adresser/Postboksadresse";
import Ukjentbosted from "./adressetyper/norske-adresser/Ukjentbosted";
import Vegadresse from "./adressetyper/norske-adresser/Vegadresse";
import UtenlanskAdresse from "./adressetyper/utenlanske-adresser/UtenlanskAdresse";
import UtenlanskAdresseIFrittFormat from "./adressetyper/utenlanske-adresser/UtenlanskAdresseIFrittFormat";

interface Props {
    adresse?: IAdresse;
    coAdressenavn?: string;
    gyldigTilOgMed?: string;
    angittFlyttedato?: string;
    oppholdAnnetSted?: string;
    tittel: string;
    language: Language;
}

const Adresse = (props: Props) => {
    if (props.adresse == null && props.oppholdAnnetSted != null) {
        return (
            <AdressePanel tittel={props.tittel} language={props.language}>
                {mapOppholdAnnetSted(props.oppholdAnnetSted, props.language)}
            </AdressePanel>
        );
    }

    const gyldigTilOgMed = props.gyldigTilOgMed;
    const gyldigTilOgMedFormatert = gyldigTilOgMed ? dayjs(gyldigTilOgMed).format("DD.MM.YYYY") : "";

    const flyttedato = props.angittFlyttedato;
    const flyttedatoFormatert = flyttedato ? dayjs(flyttedato).format("DD.MM.YYYY") : "";

    let adresse;
    let kommune;
    let bruksenhetsnummer;

    switch (props.adresse?.type) {
        case "POSTADRESSE_I_FRITT_FORMAT":
            adresse = <PostadresseIFrittFormat {...props.adresse} />;
            break;
        case "UTENLANDSK_ADRESSE_I_FRITT_FORMAT":
            adresse = <UtenlanskAdresseIFrittFormat {...props.adresse} />;
            break;
        case "VEGADRESSE":
            adresse = <Vegadresse {...props.adresse} coAdressenavn={props.coAdressenavn} />;
            kommune = props.adresse?.kommune;
            bruksenhetsnummer = props.adresse?.bruksenhetsnummer;
            break;
        case "POSTBOKSADRESSE":
            adresse = <Postboksadresse {...props.adresse} coAdressenavn={props.coAdressenavn} />;
            break;
        case "UTENLANDSK_ADRESSE":
            adresse = <UtenlanskAdresse {...props.adresse} coAdressenavn={props.coAdressenavn} />;
            break;
        case "MATRIKKELADRESSE":
            adresse = <Matrikkeladresse {...props.adresse} coAdressenavn={props.coAdressenavn} bruksenhetsnummer={""} />;
            kommune = props.adresse?.kommune;
            bruksenhetsnummer = props.adresse?.bruksenhetsnummer;
            break;
        case "UKJENTBOSTED":
            adresse = <Ukjentbosted {...props.adresse} coAdressenavn={props.coAdressenavn} />;
            break;
        default:
            return null;
    }

    return (
        <AdressePanel
            tittel={props.tittel}
            bruksenhetsnummer={bruksenhetsnummer}
            kommune={kommune}
            gyldigTilOgMedFormatert={gyldigTilOgMedFormatert}
            flyttedatoFormatert={flyttedatoFormatert}
            language={props.language}
        >
            {adresse}
        </AdressePanel>
    );
};

const mapOppholdAnnetSted = (oppholdAnnetSted: string, language: Language) => {
    switch (oppholdAnnetSted) {
        case "MILITAER":
            return text.militaer[language];
        case "UTENRIKS":
            return text.utenriks[language];
        case "PAA_SVALBARD":
            return text.paaSvalbard[language];
        case "PENDLER":
            return text.pendler[language];
    }
    return oppholdAnnetSted;
};

export default Adresse;
