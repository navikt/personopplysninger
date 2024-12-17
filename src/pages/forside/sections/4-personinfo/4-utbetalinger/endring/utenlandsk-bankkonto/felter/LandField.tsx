import { useFormContext } from 'react-hook-form';
import SelectLand from '@/components/felter/select-kodeverk/SelectLand';
import { FormFields } from '../../types';
import { useIntlFormatter } from '@/hooks/useIntlFormatter';

const BANKKODER: { [key: string]: string } = {
    US: 'FW',
    NZ: 'NZ',
    AU: 'AU',
    ZA: 'ZA',
    CA: 'CC',
    RU: 'RU',
};

const LandField = () => {
    const { formatMessage } = useIntlFormatter();

    const {
        register,
        setValue,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <SelectLand
            {...register('land', {
                required: formatMessage('validation.land.pakrevd'),
            })}
            id="bankensland"
            submitted={isSubmitted}
            label={formatMessage('felter.bankensland.label')}
            error={errors?.land?.message}
            option={watch().land}
            onChange={(option) => {
                const bankkodeRetningsnummer = option ? BANKKODER[option.value] : '';
                setValue('land', option);
                setValue('retningsnummer', bankkodeRetningsnummer);
                if (isSubmitted) {
                    trigger();
                }
            }}
        />
    );
};

export default LandField;
