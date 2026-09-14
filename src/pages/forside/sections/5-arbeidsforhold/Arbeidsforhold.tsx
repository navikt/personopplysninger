import type { AFListeOnClick } from "@navikt/arbeidsforhold";
import { Alert } from "@navikt/ds-react";
import { lazy, Suspense } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import arbeidsforholdIkon from "@/assets/img/Arbeidsforhold.svg";
import Box from "@/components/box/Box";
import Kilde from "@/components/kilde/Kilde";
import Spinner from "@/components/spinner/Spinner";
import { runtimeEnvironment } from "@/config/runtimeEnvironment";
import { basePath } from "@/constants";
import { useStore } from "@/store/Context";
import type { Locale } from "@/store/Store";
import type { Props as ArbeidsforholdListeProps } from "./ArbeidsforholdListe";

const miljo = runtimeEnvironment.environment?.toUpperCase() as "LOCAL" | "DEV" | "PROD";
const localApiUrl = runtimeEnvironment.environment === "local" ? `${runtimeEnvironment.apiUrl}/arbeidsforhold/forenklet/alle` : undefined;
const ArbeidsforholdListeFallback = (_: ArbeidsforholdListeProps) => <Spinner />;
const ArbeidsforholdListe = typeof window === "undefined" ? ArbeidsforholdListeFallback : lazy(() => import("./ArbeidsforholdListe"));

const Arbeidsforhold = () => {
    const { locale } = useIntl();
    const [{ personInfo }] = useStore();

    const printName = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.fornavn} ${personInfo.data.personalia?.etternavn}` : "";

    const printSSN = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.personident?.verdi}` : "";

    const onClick = {
        type: "LENKE",
        href: `${basePath}/${locale}/arbeidsforhold/{id}`,
    } as AFListeOnClick;

    return (
        <Box id="arbeidsforhold" tittel="arbeidsforhold.tittel" beskrivelse="arbeidsforhold.beskrivelse" icon={arbeidsforholdIkon} visAnkerlenke>
            <Suspense fallback={<Spinner />}>
                <ArbeidsforholdListe
                    miljo={miljo}
                    customApiUrl={localApiUrl}
                    locale={locale as Locale}
                    onClick={onClick}
                    printName={printName}
                    printSSN={printSSN}
                />
            </Suspense>
            <Alert variant="info">
                <FormattedMessage
                    id="arbeidsforhold.disclaimer"
                    values={{
                        br: (text) => (
                            <>
                                <br />
                                {text}
                            </>
                        ),
                    }}
                />
            </Alert>
            <Kilde kilde="arbeidsforhold.kilde" lenkeType="INGEN" />
        </Box>
    );
};
export default Arbeidsforhold;
