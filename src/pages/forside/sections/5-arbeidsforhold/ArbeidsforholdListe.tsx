import { type AFListeOnClick, ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import type { Locale } from "@/store/Store";

export interface Props {
    miljo: "LOCAL" | "DEV" | "PROD";
    customApiUrl?: string;
    locale: Locale;
    onClick: AFListeOnClick;
    printName: string;
    printSSN: string;
}

const ArbeidsforholdListe = (props: Props) => <ListeMedArbeidsforhold printActivated {...props} />;

export default ArbeidsforholdListe;
