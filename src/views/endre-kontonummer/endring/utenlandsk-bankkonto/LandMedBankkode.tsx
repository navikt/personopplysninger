import { Alert } from "@navikt/ds-react";
import type { Language } from "@/language/language";
import type { OptionType } from "@/types/option";
import { text } from "../kontonummerSkjemaText";
import { kreverBicOgBankkode } from "../utils";
import AdresseFields from "./felter/AdresseFields";
import BankkodeField from "./felter/BankkodeField";
import BickodeField from "./felter/BickodeField";

interface Props {
    valgtLand: OptionType;
    language: Language;
}

const LandMedBankkode = (props: Props) => {
    const { valgtLand, language } = props;

    return (
        <>
            <div>
                {!kreverBicOgBankkode(valgtLand) && (
                    <Alert role="status" variant="warning">
                        {text.bankkodeAdvarselFoer[language]}
                        <span className="capitalize">{valgtLand.label.toLowerCase()}</span>
                        {text.bankkodeAdvarselEtter[language]}
                    </Alert>
                )}
                <BickodeField language={language} />
                <BankkodeField language={language} />
            </div>
            <AdresseFields language={language} />
        </>
    );
};
export default LandMedBankkode;
