import SelectValuta from '@/components/felter/select-kodeverk/SelectValuta';
import { useFormContext } from 'react-hook-form';
import { useIntlFormatter } from '@/hooks/useIntlFormatter';
import { FormFields } from '../../types';

const ValutaField = () => {
    const { formatMessage } = useIntlFormatter();

    const {
        register,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <SelectValuta
            {...register('valuta', {
                required: formatMessage('validation.valuta.pakrevd'),
            })}
            id={'valuta'}
            submitted={isSubmitted}
            label={formatMessage('felter.valuta.label')}
            hjelpetekst={'utbetalinger.hjelpetekster.valuta'}
            option={watch().valuta}
            onChange={(value) => {
                setValue('valuta', value);
                isSubmitted && trigger();
            }}
            error={errors?.valuta?.message}
        />
    );
};

export default ValutaField;
