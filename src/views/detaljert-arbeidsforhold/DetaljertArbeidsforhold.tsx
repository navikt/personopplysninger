import { lazy, Suspense, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import arbeidsforholdIkon from "@/assets/img/Arbeidsforhold.svg";
import PageContainer from "@/components/pagecontainer/PageContainer";
import Spinner from "@/components/spinner/Spinner";
import { useRuntimeConfig } from "@/config/runtimeConfig";
import { useLoadPersonInfo } from "@/store/providers/PersonInfo";
import type { Locale } from "@/store/Store";

const DetaljertArbeidsforholdClient = lazy(() => import("./DetaljertArbeidsforholdClient"));

interface Props {
    id?: string;
    pathname?: string;
}

const Arbeidsforhold = ({ id, pathname }: Props) => {
    const { environment, apiUrl } = useRuntimeConfig();
    const miljo = environment.toUpperCase() as "LOCAL" | "DEV" | "PROD";
    const localApiUrl = environment === "local" ? `${apiUrl}/arbeidsforhold/{id}` : undefined;
    const { locale } = useIntl();
    const personInfo = useLoadPersonInfo();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setMounted(true);
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
            {mounted ? (
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
            ) : (
                <Spinner />
            )}
        </PageContainer>
    );
};

export default Arbeidsforhold;
