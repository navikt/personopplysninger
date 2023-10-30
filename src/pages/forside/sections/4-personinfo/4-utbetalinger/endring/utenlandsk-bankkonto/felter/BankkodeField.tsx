import { useFormContext } from 'react-hook-form';
import { FormFields } from '../../types';
import { validerBankkode } from '../../utils';
import { isBankkodeValidLength, isNumeric } from '../../../../../../../../utils/validators';
import { useIntlFormatter } from '../../../../../../../../hooks/useIntlFormatter';
import { TextField } from '@navikt/ds-react';
import { LabelMedHjelpetekst } from '../../../../../../../../components/felter/label-med-hjelpetekst/LabelMedHjelpetekst';

const BankkodeField = () => {
    const { formatMessage, formatMessageWithValues } = useIntlFormatter();

    const {
        register,
        watch,
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext<FormFields>();

    const id = 'bankkode';
    const labelId = 'bankkode_label';

    return (
        <>
            <LabelMedHjelpetekst
                label={formatMessage('felter.bankkode.label')}
                hjelpetekst={'utbetalinger.hjelpetekster.bankkode'}
                labelId={labelId}
                labelForId={id}
            />
            <div className="utbetalinger__bankkode-rad">
                <div className="utbetalinger__bankkode-kolonne">
                    <TextField
                        {...register('retningsnummer')}
                        disabled={true}
                        label={'Retningsnummer'}
                        hideLabel={true}
                        error={errors?.retningsnummer?.message}
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
                        label={undefined}
                        aria-labelledby={labelId}
                        size="medium"
                        error={errors?.bankkode?.message}
                        maxLength={watch().land && watch().land?.bankkodeLengde}
                    />
                </div>
            </div>
        </>
    );
};

export default BankkodeField;
