import { ForwardedRef, useEffect, useState, forwardRef } from 'react';
import { fetchValutaer } from 'clients/apiClient';
import { HTTPError } from 'components/errorMessage/ErrorMessage';
import NAVSelect from 'components/felter/select/NAVSelect';

interface Props {
    option?: OptionType;
    submitted: boolean;
    label: string;
    name: string;
    id: string;
    error?: string;
    onChange: (value?: OptionType) => void;
    hjelpetekst?: string;
}

interface OptionType {
    value: string;
    label: string;
}

export interface Valuta {
    kode: string;
    tekst: string;
}

const SelectValuta = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [loading, settLoading] = useState(false);
    const [valutaer, settValutaer] = useState([] as Valuta[]);
    const [fetchError, settFetchError] = useState<HTTPError | undefined>();

    useEffect(() => {
        if (!loading && !valutaer.length) {
            settLoading(true);
            fetchValutaer()
                .then((v) => {
                    settValutaer(v);
                })
                .catch((error: HTTPError) => {
                    settFetchError(error);
                })
                .then(() => {
                    settLoading(false);
                });
        }
    }, [loading, valutaer]);

    const mapKoderToOptions = (koder: Valuta[]): OptionType[] =>
        koder.map((k) => ({
            label: `${k.tekst} (${k.kode})`,
            value: k.kode,
        }));

    const options = mapKoderToOptions(valutaer)
        .sort((a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1))
        .sort((a: OptionType) => (a.value === 'SEK' ? -1 : 1))
        .sort((a: OptionType) => (a.value === 'EUR' ? -1 : 1))
        .sort((a: OptionType) => (a.value === 'USD' ? -1 : 1));

    return (
        <NAVSelect
            id={props.id}
            name={props.name}
            loading={loading}
            label={props.label}
            error={props.error}
            options={options}
            fetchError={fetchError}
            htmlSize={30}
            option={props.option}
            submitted={props.submitted}
            onChange={props.onChange}
            hjelpetekst={props.hjelpetekst}
            borderUnderNth={2}
            ref={ref}
        />
    );
});

export default SelectValuta;
