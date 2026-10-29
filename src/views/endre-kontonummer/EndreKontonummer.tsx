import { Alert, Link, Loader } from "@navikt/ds-react";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import kontonummerIkon from "@/assets/img/Kontonummer.svg";
import personaliaIkon from "@/assets/img/Personalia.svg";
import Box from "@/components/box/Box";
import ErrorMessage, { type HTTPError } from "@/components/errorMessage/ErrorMessage";
import PageContainer from "@/components/pagecontainer/PageContainer";
import MedPersonInfo from "@/store/providers/PersonInfo";
import driftsmeldinger from "../../driftsmeldinger";
import { EndreKontonummerView } from "./EndreKontonummerView";

const ErrorWithBox = (error: HTTPError) => (
    <Box id="personalia" tittel="personalia.tittel" beskrivelse="personalia.beskrivelse" icon={personaliaIkon}>
        <ErrorMessage error={error} />
    </Box>
);

interface Props {
    backTo?: string;
    pathname: string;
}

export const EndreKontonummer = ({ backTo, pathname }: Props) => {
    const intl = useIntl();
    const lenkeUrl = intl.formatMessage({ id: "endreKontonummer.lenkeURL" });

    const backToUtbetaling = `${backTo ?? ""}#utbetaling`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageContainer
            tittelId={"endreKontonummer.tittel"}
            icon={kontonummerIkon}
            backTo={backToUtbetaling}
            brodsmulesti={[{ title: "endreKontonummer.tittel" }]}
            pathname={pathname}
        >
            {driftsmeldinger.pdl && (
                <Alert role="status" variant="warning">
                    {driftsmeldinger.pdl}
                </Alert>
            )}
            <MedPersonInfo loader={<Loader />} error={ErrorWithBox}>
                {({ personalia }) => (personalia ? <EndreKontonummerView {...personalia} /> : <Loader />)}
            </MedPersonInfo>
            <Alert variant="info">
                <FormattedMessage
                    id="endreKontonummer.info"
                    values={{
                        br: (text) => (
                            <>
                                <br />
                                {text}
                            </>
                        ),
                        lenkeNavno: (text) => <Link href={lenkeUrl}>{text}</Link>,
                    }}
                />
            </Alert>
        </PageContainer>
    );
};
