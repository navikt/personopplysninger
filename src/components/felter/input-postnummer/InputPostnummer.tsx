import { useEffect, useState, memo } from 'react';
import { fetchPostnummer } from 'clients/apiClient';
import { HTTPError } from 'components/errorMessage/ErrorMessage';
import { useIntl } from 'react-intl';
import { TextField } from '@navikt/ds-react';

interface Props {
    id?: string;
    value?: string;
    submitted: boolean;
    label: string;
    error: string | null;
    onChange: (value: string) => void;
    onErrors: (value: string) => void;
}

export interface Kode {
    kode: string;
    tekst: string;
}

const SelectPostnummer = memo((props: Props) => {
    const { formatMessage } = useIntl();
    const [loading, settLoading] = useState(true);
    const [postnummer, settPostnummer] = useState([] as Kode[]);
    const [fetchError, settFetchError] = useState<HTTPError | undefined>();
    const { error, onErrors } = props;

    useEffect(() => {
        fetchPostnummer()
            .then((postnummer: Kode[]) => {
                settPostnummer(postnummer);
            })
            .catch((error: HTTPError) => {
                settFetchError(error);
            })
            .then(() => {
                settLoading(false);
            });
    }, [settPostnummer, settFetchError, settLoading]);

    const poststed = postnummer.filter((postnummer) => props.value && postnummer.kode === props.value.toString()).shift();

    useEffect(() => {
        const errorText = formatMessage({ id: 'validation.postnummer.pakrevd' });
        if (error !== errorText && !poststed && !loading) {
            onErrors(errorText);
        }
    }, [loading, error, onErrors, poststed, formatMessage]);

    return (
        <div className="input-postnummer__container">
            <TextField
                id={props.id}
                min={0}
                maxLength={4}
                size={'medium'}
                type={'number'}
                value={props.value}
                label={props.label}
                error={props.submitted && props.error}
                onChange={(e) => {
                    if (e.target.value.length <= 4) {
                        props.onChange(e.target.value);
                    }
                }}
                autoComplete="postal-code"
            />
            <div className="input-postnummer__poststed">{poststed && !fetchError && <>{poststed.tekst}</>}</div>
        </div>
    );
});

export default SelectPostnummer;
