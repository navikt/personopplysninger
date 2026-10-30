import type { Language } from "@/language/language";
import BickodeField from "./felter/BickodeField";

interface Props {
    language: Language;
}

const LandUtenBankkode = ({ language }: Props) => {
    return <BickodeField language={language} />;
};

export default LandUtenBankkode;
