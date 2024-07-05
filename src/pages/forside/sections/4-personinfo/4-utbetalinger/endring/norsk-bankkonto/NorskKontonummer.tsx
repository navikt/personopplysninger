import { useIntl } from 'react-intl';
import { TextField } from '@navikt/ds-react';
import { normalizeNummer } from '@/utils/formattering';
import { FieldValues, useFormContext } from 'react-hook-form';
import { isNormalizedLength, isNormalizedMod11 } from '@/utils/validators';
import { FormFields } from '../types';

interface Props {
    personident?: { verdi: string; type: string };
}

const OpprettEllerEndreNorskKontonr = (props: Props) => {
    const { formatMessage: msg } = useIntl();

    const {
        register,
        formState: { errors },
    } = useFormContext<FormFields>();

    return (
        <div className="utbetalinger__input input--m">
            <TextField
                {...register('kontonummer', {
                    required: msg({ id: 'validation.kontonummer.pakrevd' }),
                    validate: {
                        isNormalizedLength11: (v) => isNormalizedLength(v, 11) || msg({ id: 'validation.kontonummer.elleve' }),
                        isMod11: (v) => isNormalizedMod11(v) || msg({ id: 'validation.kontonummer.mod11' }),
                        isNotYourSSN: (v) => normalizeNummer(v) !== props.personident?.verdi || msg({ id: 'validation.kontonummer.idnr' }),
                    },
                })}
                size={'medium'}
                htmlSize={14}
                maxLength={16}
                label={msg({ id: 'felter.kontonummer.label' })}
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
