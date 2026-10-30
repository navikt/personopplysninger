import type { Language } from "@/language/language";
import AdresseFields from "./felter/AdresseFields";
import BankkodeField from "./felter/BankkodeField";

interface Props {
    language: Language;
}

const AmerikanskKonto = ({ language }: Props) => {
    return (
        <>
            <BankkodeField language={language} />
            <AdresseFields language={language} />
        </>
    );
};

export default AmerikanskKonto;
