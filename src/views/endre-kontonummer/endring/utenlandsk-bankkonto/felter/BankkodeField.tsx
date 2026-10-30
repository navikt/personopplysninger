import { TextField } from "@navikt/ds-react";
import { useFormContext } from "react-hook-form";
import { LabelMedHjelpetekst } from "@/components/felter/label-med-hjelpetekst/LabelMedHjelpetekst";
import type { Language } from "@/language/language";
import { isBankkodeValidLength, isNumeric } from "@/utils/validators";
import utbetalStyles from "@/views/forside/sections/4-personinfo/4-utbetalinger/Utbetalinger.module.css";
import { text as utbetalingerText } from "@/views/forside/utbetalinger/utbetalingerText";
import { text } from "../../kontonummerSkjemaText";
import type { FormFields } from "../../types";
import { validerBankkode } from "../../utils";

interface Props {
    language: Language;
}

const BankkodeField = ({ language }: Props) => {
    const {
        register,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <div className={utbetalStyles.bankkodeRad}>
            <div className={utbetalStyles.bankkodeKolonne}>
                <TextField
                    {...register("retningsnummer")}
                    disabled={true}
                    label={"Retningsnummer"}
                    hideLabel={true}
                    error={errors?.retningsnummer?.message}
                    autoComplete="off"
                />
            </div>
            <div className={utbetalStyles.bankkodeKolonne}>
                <TextField
                    {...register("bankkode", {
                        onChange: () => isSubmitted && trigger(),
                        validate: {
                            ...(validerBankkode(watch().land, watch().bickode, watch().bankkode) && {
                                required: (v) => !!v || text.bankkodePaakrevd[language],
                                numeric: (v) => isNumeric(v) || text.kunTall[language],
                                validLength: (v) =>
                                    isBankkodeValidLength(v, watch().land) ||
                                    text.bankkodeLengde[language](watch().land?.label ?? "", watch().land?.bankkodeLengde ?? ""),
                            }),
                        },
                    })}
                    id={"bankkode"}
                    label={
                        <LabelMedHjelpetekst
                            label={text.bankkodeLabel[language]}
                            hjelpetekst={
                                <>
                                    <p>{utbetalingerText.bankkodeHjelp1[language]}</p>
                                    <p>{utbetalingerText.bankkodeHjelp2[language]}</p>
                                    <p>{utbetalingerText.bankkodeHjelp3[language]}</p>
                                </>
                            }
                            language={language}
                        />
                    }
                    size="medium"
                    error={errors?.bankkode?.message}
                    maxLength={watch().land && watch().land?.bankkodeLengde}
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default BankkodeField;
