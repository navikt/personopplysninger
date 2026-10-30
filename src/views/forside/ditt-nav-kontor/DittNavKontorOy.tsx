import { type AudienceReception, Reception } from "@navikt/nav-office-reception-info";
import type { Language } from "@/language/language";

interface Props {
    language: Language;
    publikumsmottak: AudienceReception[];
}

const DittNavKontorOy = ({ language, publikumsmottak }: Props) => <Reception receptions={publikumsmottak} language={language} />;

export default DittNavKontorOy;
