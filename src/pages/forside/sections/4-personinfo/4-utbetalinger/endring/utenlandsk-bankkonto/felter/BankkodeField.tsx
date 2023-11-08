import { useFormContext } from 'react-hook-form';
import { FormFields } from '../../types';
import { validerBankkode } from '../../utils';
import { isBankkodeValidLength, isNumeric } from 'utils/validators';
import { useIntlFormatter } from 'hooks/useIntlFormatter';
import { LabelMedHjelpetekst } from 'components/felter/label-med-hjelpetekst/LabelMedHjelpetekst';
import { TextField } from '@navikt/ds-react';

const BankkodeField = () => {
    const { formatMessage, formatMessageWithValues } = useIntlFormatter();
    const {
        register,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    return (
        <div className="utbetalinger__bankkode-rad">
            <div className="utbetalinger__bankkode-kolonne">
                <TextField
                    {...register('retningsnummer')}
                    disabled={true}
                    label={'Retningsnummer'}
                    hideLabel={true}
                    error={errors?.retningsnummer?.message}
                    autoComplete="off"
                />
            </div>
            <div className="utbetalinger__bankkode-kolonne">
                <TextField
                    {...register('bankkode', {
                        onChange: () => isSubmitted && trigger(),
                        validate: {
                            ...(validerBankkode(watch().land, watch().bickode, watch().bankkode) && {
                                required: (v) => !!v || formatMessage('validation.bankkode.pakrevd'),
                                numeric: (v) => isNumeric(v) || formatMessage('validation.only.digits'),
                                validLength: (v) =>
                                    isBankkodeValidLength(v, watch().land) ||
                                    formatMessageWithValues('validation.bankkode.lengde', {
                                        land: watch().land?.label,
                                        siffer: watch().land?.bankkodeLengde,
                                    }),
                            }),
                        },
                    })}
                    id={'bankkode'}
                    label={<LabelMedHjelpetekst
                        label={formatMessage('felter.bankkode.label')}
                        hjelpetekst={'utbetalinger.hjelpetekster.bankkode'}
                    />}
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
