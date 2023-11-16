import { useFormContext } from 'react-hook-form';
import { FormFields } from '../../types';
import { useIntlFormatter } from 'hooks/useIntlFormatter';
import { isValidIBAN } from 'ibantools';
import { harValgtUSA } from '../../utils';
import { isIBANCountryCompliant, isLettersAndDigits } from 'utils/validators';
import { LabelMedHjelpetekst } from 'components/felter/label-med-hjelpetekst/LabelMedHjelpetekst';
import { TextField } from '@navikt/ds-react';

interface Props {
    personident?: { verdi: string; type: string };
}

const KontonummerIbanField = (props: Props) => {
    const { formatMessage } = useIntlFormatter();

    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<FormFields>();

    return (
        <TextField
            {...register('kontonummerIban', {
                validate: {
                    ...(watch().land?.kreverIban && {
                        required: (v) => !!v || formatMessage('validation.iban.pakrevd'),
                        validIban: (v) => isValidIBAN(v) || formatMessage('validation.iban.gyldig'),
                    }),
                    ...(!watch().land?.kreverIban && {
                        required: (v) => !!v || formatMessage('validation.kontonummer.pakrevd'),
                    }),
                    ...(harValgtUSA(watch().land) && {
                        notIban: (v) => !isValidIBAN(v) || formatMessage('validation.ikke.iban'),
                    }),
                    ...(isValidIBAN(watch().kontonummerIban) && {
                        ibanCountryCompliant: (v) => isIBANCountryCompliant(v, watch().land) || formatMessage('validation.iban.country'),
                    }),
                    lettersAndDigits: (v) => isLettersAndDigits(v) || formatMessage('validation.only.letters.and.digits'),
                    notUsersSsn: (v) => v !== props.personident?.verdi || formatMessage('validation.kontonummer.idnr'),
                },
            })}
            id="kontonummerIban"
            size="medium"
            maxLength={36}
            htmlSize={37}
            label={
                <LabelMedHjelpetekst
                    label={formatMessage('felter.kontonummer.kontonummer.label')}
                    hjelpetekst={'utbetalinger.hjelpetekster.kontonummer'}
                />
            }
            error={errors?.kontonummerIban?.message}
            autoComplete="off"
        />
    );
};

export default KontonummerIbanField;
