import { type AudienceReception, Reception } from "@navikt/nav-office-reception-info";
import type { Locale } from "@/store/Store";

interface Props {
    locale: Locale;
    publikumsmottak: AudienceReception[];
}

const DittNavKontorOy = ({ locale, publikumsmottak }: Props) => <Reception receptions={publikumsmottak} language={locale} />;

export default DittNavKontorOy;
