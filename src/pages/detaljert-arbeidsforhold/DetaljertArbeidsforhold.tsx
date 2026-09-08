import { lazy, Suspense, useEffect } from "react";
import { useIntl } from "react-intl";
import arbeidsforholdIkon from "@/assets/img/Arbeidsforhold.svg";
import PageContainer from "@/components/pagecontainer/PageContainer";
import Spinner from "@/components/spinner/Spinner";
import { runtimeEnvironment } from "@/config/runtimeEnvironment";
import { useStore } from "@/store/Context";
import type { Locale } from "@/store/Store";

const miljo = runtimeEnvironment.environment?.toUpperCase() as "LOCAL" | "DEV" | "PROD";
const localApiUrl = runtimeEnvironment.environment === "local" ? `${runtimeEnvironment.apiUrl}/arbeidsforhold/{id}` : undefined;
const DetaljertArbeidsforholdFallback = (_: DetaljertArbeidsforholdClientProps) => <Spinner />;
const DetaljertArbeidsforholdClient =
    typeof window === "undefined" ? DetaljertArbeidsforholdFallback : lazy(() => import("./DetaljertArbeidsforholdClient"));

interface Props {
    id?: string;
    pathname?: string;
}

const Arbeidsforhold = ({ id, pathname }: Props) => {
    const { locale } = useIntl();
    const [{ personInfo }] = useStore();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (typeof id === "undefined") {
        return null;
    }

    const navArbeidsforholdId = parseInt(id, 10);

    const printName = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.fornavn} ${personInfo.data.personalia?.etternavn}` : "";

    const printSSN = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.personident?.verdi}` : "";

    return (
        <PageContainer
            tittelId="arbeidsforhold.tittel"
            icon={arbeidsforholdIkon}
            brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
            backTo={"/#arbeidsforhold"}
            pathname={pathname}
        >
            <Suspense fallback={<Spinner />}>
                <DetaljertArbeidsforholdClient
                    miljo={miljo}
                    customApiUrl={localApiUrl}
                    locale={locale as Locale}
                    navArbeidsforholdId={navArbeidsforholdId}
                    printName={printName}
                    printSSN={printSSN}
                />
            </Suspense>
        </PageContainer>
    );
};

export default Arbeidsforhold;
