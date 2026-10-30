import { TextField } from "@navikt/ds-react";
import { isValidIBAN } from "ibantools";
import { useFormContext } from "react-hook-form";
import { LabelMedHjelpetekst } from "@/components/felter/label-med-hjelpetekst/LabelMedHjelpetekst";
import type { Language } from "@/language/language";
import { isIBANCountryCompliant, isLettersAndDigits } from "@/utils/validators";
import { text as utbetalingerText } from "@/views/forside/utbetalinger/utbetalingerText";
import { text } from "../../kontonummerSkjemaText";
import type { FormFields } from "../../types";
import { harValgtUSA } from "../../utils";

interface Props {
    personident?: { verdi: string; type: string };
    language: Language;
}

const KontonummerIbanField = (props: Props) => {
    const { language } = props;

    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<FormFields>();

    return (
        <TextField
            {...register("kontonummerIban", {
                validate: {
                    ...(watch().land?.kreverIban && {
                        required: (v) => !!v || text.ibanPaakrevd[language],
                        validIban: (v) => isValidIBAN(v) || text.ibanGyldig[language],
                    }),
                    ...(!watch().land?.kreverIban && {
                        required: (v) => !!v || text.kontonummerPaakrevd[language],
                    }),
                    ...(harValgtUSA(watch().land) && {
                        notIban: (v) => !isValidIBAN(v) || text.ikkeIban[language],
                    }),
                    ...(isValidIBAN(watch().kontonummerIban) && {
                        ibanCountryCompliant: (v) => isIBANCountryCompliant(v, watch().land) || text.ibanLand[language],
                    }),
                    lettersAndDigits: (v) => isLettersAndDigits(v) || text.kunBokstaverOgTall[language],
                    notUsersSsn: (v) => v !== props.personident?.verdi || text.kontonummerIdnr[language],
                },
            })}
            id="kontonummerIban"
            size="medium"
            maxLength={36}
            htmlSize={37}
            label={
                <LabelMedHjelpetekst
                    label={text.kontonummerIbanLabel[language]}
                    hjelpetekst={
                        <>
                            <p>{utbetalingerText.kontonummerHjelp1[language]}</p>
                            <p>{utbetalingerText.kontonummerHjelp2[language]}</p>
                            <p>{utbetalingerText.kontonummerHjelp3[language]}</p>
                            <p>{utbetalingerText.kontonummerHjelp4[language]}</p>
                        </>
                    }
                    language={language}
                />
            }
            error={errors?.kontonummerIban?.message}
            autoComplete="off"
        />
    );
};

export default KontonummerIbanField;
