import { TextField } from "@navikt/ds-react";
import { useFormContext } from "react-hook-form";
import { LabelMedHjelpetekst } from "@/components/felter/label-med-hjelpetekst/LabelMedHjelpetekst";
import type { Language } from "@/language/language";
import { hasMultipleCombinedSpaces, isBlacklistedCommon, isFirstCharNotSpace, isOnlyNonLetters, isValidBanknavn } from "@/utils/validators";
import { text } from "../../kontonummerSkjemaText";
import type { FormFields } from "../../types";

interface Props {
    language: Language;
}

const BanknavnField = ({ language }: Props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormFields>();

    return (
        <TextField
            {...register("banknavn", {
                validate: {
                    required: (v) => !!v || text.banknavnPaakrevd[language],
                    firstCharNotSpace: (v) => isFirstCharNotSpace(v) || text.foersteTegnMellomrom[language],
                    notBlacklisted: (v) => !isBlacklistedCommon(v) || text.svarteliste[language],
                    noCombinedSpaces: (v) => !hasMultipleCombinedSpaces(v) || text.flereMellomrom[language],
                    notOnlyNonLetters: (v) => !isOnlyNonLetters(v) || text.kunMellomromTegnSifre[language],
                    validBanknavn: (v) => isValidBanknavn(v) || text.banknavnUgyldig[language],
                },
            })}
            id="banknavn"
            size="medium"
            maxLength={35}
            htmlSize={37}
            label={<LabelMedHjelpetekst label={text.banknavnLabel[language]} language={language} />}
            error={errors?.banknavn?.message}
            autoComplete="off"
        />
    );
};

export default BanknavnField;
