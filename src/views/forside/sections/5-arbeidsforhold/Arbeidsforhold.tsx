import { type AFListeOnClick, ListeMedArbeidsforhold } from "@navikt/arbeidsforhold";
import { Alert } from "@navikt/ds-react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import arbeidsforholdIkon from "@/assets/img/Arbeidsforhold.svg?url";
import Box from "@/components/box/Box";
import Kilde from "@/components/kilde/Kilde";
import { basePath } from "@/constants";
import { useRuntimeConfig } from "@/runtime-config/RuntimeConfigContext";
import { useStore } from "@/store/Context";
import type { Locale } from "@/store/Store";

const Arbeidsforhold = () => {
    const { locale } = useIntl();
    const [{ personInfo }] = useStore();
    const runtimeConfig = useRuntimeConfig();
    const miljo = runtimeConfig.env.toUpperCase() as "LOCAL" | "DEV" | "PROD";
    const localApiUrl = runtimeConfig.env === "local" ? `${runtimeConfig.apiUrl}/arbeidsforhold/forenklet/alle` : undefined;

    const printName = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.fornavn} ${personInfo.data.personalia?.etternavn}` : "";

    const printSSN = personInfo.status === "RESULT" ? `${personInfo.data.personalia?.personident?.verdi}` : "";

    const onClick = {
        type: "REACT_ROUTER_LENKE",
        Component: Link,
        to: `${basePath}/${locale}/arbeidsforhold/{id}`,
    } as AFListeOnClick;

    return (
        <Box id="arbeidsforhold" tittel="arbeidsforhold.tittel" beskrivelse="arbeidsforhold.beskrivelse" icon={arbeidsforholdIkon} visAnkerlenke>
            <ListeMedArbeidsforhold
                miljo={miljo}
                customApiUrl={localApiUrl}
                locale={locale as Locale}
                onClick={onClick}
                printActivated={true}
                printName={printName}
                printSSN={printSSN}
            />
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
