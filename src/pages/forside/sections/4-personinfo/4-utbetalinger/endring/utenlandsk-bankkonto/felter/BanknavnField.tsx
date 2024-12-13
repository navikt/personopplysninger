import { useFormContext } from 'react-hook-form';
import { TextField } from '@navikt/ds-react';
import { hasMultipleCombinedSpaces, isBlacklistedCommon, isFirstCharNotSpace, isOnlyNonLetters, isValidBanknavn } from '@/utils/validators';
import { useIntlFormatter } from '@/hooks/useIntlFormatter';
import { LabelMedHjelpetekst } from '@/components/felter/label-med-hjelpetekst/LabelMedHjelpetekst';
import { FormFields } from '../../types';

const BanknavnField = () => {
    const { formatMessage } = useIntlFormatter();

    const {
        register,
        formState: { errors },
    } = useFormContext<FormFields>();

    return (
        <TextField
            {...register('banknavn', {
                validate: {
                    required: (v) => !!v || formatMessage('validation.banknavn.pakrevd'),
                    firstCharNotSpace: (v) => isFirstCharNotSpace(v) || formatMessage('validation.firstchar.notspace'),
                    notBlacklisted: (v) => !isBlacklistedCommon(v) || formatMessage('validation.svarteliste.felles'),
                    noCombinedSpaces: (v) => !hasMultipleCombinedSpaces(v) || formatMessage('validation.multiple.spaces'),
                    notOnlyNonLetters: (v) => !isOnlyNonLetters(v) || formatMessage('validation.only.space.signs.or.digits'),
                    validBanknavn: (v) => isValidBanknavn(v) || formatMessage('validation.banknavn.ugyldig'),
                },
            })}
            id="banknavn"
            size="medium"
            maxLength={35}
            htmlSize={37}
            label={<LabelMedHjelpetekst label={formatMessage('felter.banknavn.label')} />}
            error={errors?.banknavn?.message}
            autoComplete="off"
        />
    );
};

export default BanknavnField;
