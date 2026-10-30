import { Alert, ErrorSummary, Link } from "@navikt/ds-react";
import { electronicFormatIBAN } from "ibantools";
import { type FieldValues, useFormContext } from "react-hook-form";
import type { Language } from "@/language/language";
import { mapErrorsToSummary } from "@/utils/kontonummer";
import { text } from "../kontonummerSkjemaText";
import type { FormFields } from "../types";
import { brukerBankkode, harValgtUSA, validerBankkode, validerBic } from "../utils";
import AmerikanskKonto from "./AmerikanskKonto";
import BanknavnField from "./felter/BanknavnField";
import KontonummerIbanField from "./felter/KontonummerIbanField";
import LandField from "./felter/LandField";
import ValutaField from "./felter/ValutaField";
import LandMedBankkode from "./LandMedBankkode";
import LandUtenBankkode from "./LandUtenBankkode";

interface Props {
    personident?: { verdi: string; type: string };
    language: Language;
}

const OpprettEllerEndreUtenlandsbank = (props: Props) => {
    const { language } = props;
    const {
        watch,
        formState: { isSubmitted, errors },
    } = useFormContext<FormFields>();

    const valgtLand = watch().land;

    const utenlandskKontoInfoUrl = {
        nb: "https://www.nav.no/utbetaling-utland",
        nn: "https://www.nav.no/utbetaling-utland",
        en: "https://www.nav.no/en/home/about-nav/relatert-informasjon/payment-of-benefits-from-nav-to-recipients-living-abroad",
    };

    return (
        <>
            <Alert variant="info">
                {text.utenlandskKontoInfoFoer[language]}
                <Link href={utenlandskKontoInfoUrl[language]}>{text.utenlandskKontoInfoLenke[language]}</Link>
                {text.utenlandskKontoInfoEtter[language]}
            </Alert>

            <LandField language={language} />

            {valgtLand && (
                <>
                    <ValutaField language={language} />
                    <BanknavnField language={language} />
                    <KontonummerIbanField personident={props.personident} language={language} />

                    {harValgtUSA(valgtLand) ? (
                        <AmerikanskKonto language={language} />
                    ) : brukerBankkode(valgtLand) ? (
                        <LandMedBankkode valgtLand={valgtLand} language={language} />
                    ) : (
                        <LandUtenBankkode language={language} />
                    )}
                </>
            )}
            {isSubmitted && Object.keys(errors).length > 0 && (
                <ErrorSummary title={text.rettOpp[language]}>
                    {mapErrorsToSummary(errors).map((error) => (
                        <ErrorSummary.Item key={error.skjemaelementId} href={`#${error.skjemaelementId}`}>
                            {error.feilmelding}
                        </ErrorSummary.Item>
                    ))}
                </ErrorSummary>
            )}
        </>
    );
};
export const setOutboundUtenlandsbankonto = (values: FieldValues) => {
    const sendBankkode = validerBankkode(values.land, values.bickode, values.bankkode);
    const sendBICKode = validerBic(values.land, values.bickode, values.bankkode);
    const sendAdresse = brukerBankkode(values.land);

    return {
        value: electronicFormatIBAN(values.kontonummerIban),
        utenlandskKontoInformasjon: {
            landkode: values.land.value,
            valuta: values.valuta.value,
            ...(sendBICKode && {
                swift: values.bickode,
            }),
            bank: {
                ...(sendAdresse && {
                    adresseLinje1: values.adresse1,
                    adresseLinje2: values.adresse2,
                    adresseLinje3: values.adresse3,
                }),
                ...(sendBankkode && {
                    kode: values.bankkode,
                }),
                navn: values.banknavn,
            },
        },
    };
};

export default OpprettEllerEndreUtenlandsbank;
