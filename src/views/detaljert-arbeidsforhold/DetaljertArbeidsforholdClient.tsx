import { DetaljertArbeidsforhold as DetaljertArbeidsforholdComponent } from "@navikt/arbeidsforhold";
import type { Language } from "@/language/language";

interface Props {
    miljo: "LOCAL" | "DEV" | "PROD";
    customApiUrl?: string;
    locale: Language;
    navArbeidsforholdId: number;
    printName: string;
    printSSN: string;
}

const DetaljertArbeidsforholdClient = (props: Props) => <DetaljertArbeidsforholdComponent rolle="ARBEIDSTAKER" printActivated {...props} />;

export default DetaljertArbeidsforholdClient;
