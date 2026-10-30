import { TextField } from "@navikt/ds-react";
import { type FieldValues, useFormContext } from "react-hook-form";
import type { Language } from "@/language/language";
import { normalizeNummer } from "@/utils/formattering";
import { isNormalizedLength, isNormalizedMod11 } from "@/utils/validators";
import { text } from "../kontonummerSkjemaText";
import type { FormFields } from "../types";

interface Props {
    personident?: { verdi: string; type: string };
    language: Language;
}

const OpprettEllerEndreNorskKontonr = (props: Props) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<FormFields>();

    return (
        <div>
            <TextField
                {...register("kontonummer", {
                    required: text.kontonummerPaakrevd[props.language],
                    validate: {
                        isNormalizedLength11: (v) => isNormalizedLength(v, 11) || text.kontonummerElleve[props.language],
                        isMod11: (v) => isNormalizedMod11(v) || text.kontonummerMod11[props.language],
                        isNotYourSSN: (v) => normalizeNummer(v) !== props.personident?.verdi || text.kontonummerIdnr[props.language],
                    },
                })}
                size={"medium"}
                htmlSize={14}
                maxLength={16}
                label={text.kontonummerLabel[props.language]}
                error={errors?.kontonummer?.message}
                autoComplete="off"
            />
        </div>
    );
};
export const setOutboundNorskKontonummer = (values: FieldValues) => {
    const { kontonummer } = values;
    return {
        value: normalizeNummer(kontonummer),
    };
};

export default OpprettEllerEndreNorskKontonr;
