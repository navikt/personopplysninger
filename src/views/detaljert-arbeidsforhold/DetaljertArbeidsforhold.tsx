import { DetaljertArbeidsforhold } from "@navikt/arbeidsforhold";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { type Params, useParams } from "react-router-dom";
import arbeidsforholdIkon from "@/assets/img/Arbeidsforhold.svg?url";
import PageContainer from "@/components/pagecontainer/PageContainer";
import { useRuntimeConfig } from "@/runtime-config/RuntimeConfigContext";
import { useStore } from "@/store/Context";
import type { Locale } from "@/store/Store";
// Side-effect: loads styles for @navikt/arbeidsforhold's internal .da__* elements
import "./DetaljertArbeidsforhold.module.css";

interface Routes {
    id: string;
}

const Arbeidsforhold = () => {
    const { locale } = useIntl();
    const params = useParams<Readonly<Params<keyof Routes>>>();
    const [{ personInfo }] = useStore();
    const runtimeConfig = useRuntimeConfig();
    const miljo = runtimeConfig.env.toUpperCase() as "LOCAL" | "DEV" | "PROD";
    const localApiUrl = runtimeConfig.env === "local" ? `${runtimeConfig.apiUrl}/arbeidsforhold/{id}` : undefined;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (typeof params.id === "undefined") {
        return null;
    }

    const id: number = parseInt(params.id, 10);

    const printName = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.fornavn} ${personInfo.data.personalia?.etternavn}` : "";

    const printSSN = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.personident?.verdi}` : "";

    return (
        <PageContainer
            tittelId="arbeidsforhold.tittel"
            icon={arbeidsforholdIkon}
            brodsmulesti={[{ title: "arbeidsforhold.tittel" }]}
            backTo={"/#arbeidsforhold"}
        >
            <DetaljertArbeidsforhold
                rolle={"ARBEIDSTAKER"}
                miljo={miljo}
                customApiUrl={localApiUrl}
                locale={locale as Locale}
                navArbeidsforholdId={id}
                printActivated={true}
                printName={printName}
                printSSN={printSSN}
            />
        </PageContainer>
    );
};

export default Arbeidsforhold;
