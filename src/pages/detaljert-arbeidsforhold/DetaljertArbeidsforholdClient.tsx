import { DetaljertArbeidsforhold as DetaljertArbeidsforholdComponent } from "@navikt/arbeidsforhold";
import type { Locale } from "@/store/Store";

export interface Props {
    miljo: "LOCAL" | "DEV" | "PROD";
    customApiUrl?: string;
    locale: Locale;
    navArbeidsforholdId: number;
    printName: string;
    printSSN: string;
}

const DetaljertArbeidsforholdClient = (props: Props) => <DetaljertArbeidsforholdComponent rolle="ARBEIDSTAKER" printActivated {...props} />;

export default DetaljertArbeidsforholdClient;
