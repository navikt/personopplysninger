import { type AFListeOnClick, ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import type { Language } from "@/language/language";

interface Props {
    miljo: "LOCAL" | "DEV" | "PROD";
    customApiUrl?: string;
    locale: Language;
    onClick: AFListeOnClick;
    printName: string;
    printSSN: string;
}

const ArbeidsforholdListe = (props: Props) => <ListeMedArbeidsforhold printActivated {...props} />;

export default ArbeidsforholdListe;
