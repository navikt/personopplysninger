import { useFormContext } from "react-hook-form";
import SelectLand from "@/components/felter/select-kodeverk/SelectLand";
import type { Language } from "@/language/language";
import { text } from "../../kontonummerSkjemaText";
import type { FormFields } from "../../types";

const BANKKODER: { [key: string]: string } = {
    US: "FW",
    NZ: "NZ",
    AU: "AU",
    ZA: "ZA",
    CA: "CC",
    RU: "RU",
};

interface Props {
    language: Language;
}

const LandField = ({ language }: Props) => {
    const {
        register,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <SelectLand
            {...register("land", {
                required: text.landPaakrevd[language],
            })}
            id="bankensland"
            submitted={isSubmitted}
            label={text.bankensLandLabel[language]}
            error={errors?.land?.message}
            option={watch().land}
            onChange={(option) => {
                const bankkodeRetningsnummer = option ? BANKKODER[option.value] : "";
                setValue("land", option);
                setValue("retningsnummer", bankkodeRetningsnummer);
                if (isSubmitted) {
                    trigger();
                }
            }}
            language={language}
        />
    );
};

export default LandField;
