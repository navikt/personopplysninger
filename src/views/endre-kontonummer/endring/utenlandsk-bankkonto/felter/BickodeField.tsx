import { TextField } from "@navikt/ds-react";
import { isValidBIC } from "ibantools";
import { useFormContext } from "react-hook-form";
import { LabelMedHjelpetekst } from "@/components/felter/label-med-hjelpetekst/LabelMedHjelpetekst";
import type { Language } from "@/language/language";
import { isBICCountryCompliant, isLettersAndDigits } from "@/utils/validators";
import { text as utbetalingerText } from "@/views/forside/utbetalinger/utbetalingerText";
import { text } from "../../kontonummerSkjemaText";
import type { FormFields } from "../../types";
import { validerBic } from "../../utils";

interface Props {
    language: Language;
}

const BickodeField = ({ language }: Props) => {
    const {
        register,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <TextField
            {...register("bickode", {
                onChange: () => isSubmitted && trigger(),
                validate: {
                    ...(validerBic(watch().land, watch().bickode, watch().bankkode) && {
                        required: (v) => !!v || text.bicPaakrevd[language],
                        lettersAndDigits: (v) => isLettersAndDigits(v) || text.kunBokstaverOgTall[language],
                        validBic: (v) => isValidBIC(v) || text.bicGyldig[language],
                        bicCountryCompliant: (v) => isBICCountryCompliant(v, watch().land) || text.bicLand[language],
                    }),
                },
            })}
            id={"bickode"}
            size="medium"
            maxLength={11}
            label={
                <LabelMedHjelpetekst
                    label={text.bicLabel[language]}
                    hjelpetekst={
                        <>
                            <p>{utbetalingerText.bicHjelp1[language]}</p>
                            <p>{utbetalingerText.bicHjelp2[language]}</p>
                            <p>{utbetalingerText.bicHjelp3[language]}</p>
                        </>
                    }
                    language={language}
                />
            }
            error={errors?.bickode?.message}
            autoComplete="off"
        />
    );
};

export default BickodeField;
