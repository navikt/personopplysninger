import { ForwardedRef, forwardRef } from 'react';
import { TextField, TextFieldProps } from '@navikt/ds-react';
import { LabelMedHjelpetekst } from '../label-med-hjelpetekst/LabelMedHjelpetekst';

interface Props extends TextFieldProps {
    id?: string;
    value?: string;
    error?: string | null;
    hjelpetekst?: string;
}

const EndreKontonummerFelt = forwardRef(
    ({ id, value, error, htmlSize, label, hjelpetekst, ...restProps }: Props, ref: ForwardedRef<HTMLInputElement>) => {
        const labelId = id + '_label';

        return (
            <div className="skjemaelement">
                <LabelMedHjelpetekst label={label} hjelpetekst={hjelpetekst} labelId={labelId} labelForId={id} />
                <TextField
                    label={undefined}
                    id={id}
                    aria-labelledby={labelId}
                    value={value}
                    htmlSize={htmlSize}
                    error={error}
                    ref={ref}
                    autoComplete="off"
                    {...restProps}
                />
            </div>
        );
    }
);

export default EndreKontonummerFelt;
