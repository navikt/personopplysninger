import { useFormContext } from 'react-hook-form';
import { isValidBIC } from 'ibantools';
import { TextField } from '@navikt/ds-react';
import { FormFields } from '@/types';
import { useIntlFormatter } from '@/hooks/useIntlFormatter';
import { validerBic } from '../../utils';
import { isBICCountryCompliant, isLettersAndDigits } from '@/utils/validators';
import { LabelMedHjelpetekst } from '@/components/felter/label-med-hjelpetekst/LabelMedHjelpetekst';

const BickodeField = () => {
    const { formatMessage } = useIntlFormatter();
    const {
        register,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <TextField
            {...register('bickode', {
                onChange: () => isSubmitted && trigger(),
                validate: {
                    ...(validerBic(watch().land, watch().bickode, watch().bankkode) && {
                        required: (v) => !!v || formatMessage('validation.bic.pakrevd'),
                        lettersAndDigits: (v) => isLettersAndDigits(v) || formatMessage('validation.only.letters.and.digits'),
                        validBic: (v) => isValidBIC(v) || formatMessage('validation.bic.gyldig'),
                        bicCountryCompliant: (v) => isBICCountryCompliant(v, watch().land) || formatMessage('validation.bic.country'),
                    }),
                },
            })}
            id={'bickode'}
            size="medium"
            maxLength={11}
            label={<LabelMedHjelpetekst label={formatMessage('felter.bic.label')} hjelpetekst={'utbetalinger.hjelpetekster.bic'} />}
            error={errors?.bickode?.message}
            autoComplete="off"
        />
    );
};

export default BickodeField;
