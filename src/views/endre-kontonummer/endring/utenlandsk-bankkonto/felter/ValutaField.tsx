import { useFormContext } from "react-hook-form";
import SelectValuta from "@/components/felter/select-kodeverk/SelectValuta";
import type { Language } from "@/language/language";
import { text as utbetalingerText } from "@/views/forside/utbetalinger/utbetalingerText";
import { text } from "../../kontonummerSkjemaText";
import type { FormFields } from "../../types";

interface Props {
    language: Language;
}

const ValutaField = ({ language }: Props) => {
    const {
        register,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <SelectValuta
            {...register("valuta", {
                required: text.valutaPaakrevd[language],
            })}
            id={"valuta"}
            submitted={isSubmitted}
            label={text.valutaLabel[language]}
            hjelpetekst={
                <>
                    <p>{utbetalingerText.valutaHjelp1[language]}</p>
                    <p>{utbetalingerText.valutaHjelp2[language]}</p>
                </>
            }
            option={watch().valuta}
            onChange={(value) => {
                setValue("valuta", value);
                if (isSubmitted) {
                    trigger();
                }
            }}
            error={errors?.valuta?.message}
            language={language}
        />
    );
};

export default ValutaField;
