import { ForwardedRef, useEffect, useState, forwardRef } from 'react';
import { FormatOptionLabelMeta } from 'react-select/base';
import { fetchRetningsnumre } from '@/clients/apiClient';
import { HTTPError } from '@/components/errorMessage/ErrorMessage';
import NAVSelect from '@/components/felter/select/NAVSelect';

interface Props {
    option: OptionType;
    submitted: boolean;
    label: string;
    name: string;
    id: string;
    error?: string;
    onChange: (value?: OptionType) => void;
}

interface OptionType {
    value: string;
    label: string;
}

export interface Kode {
    landskode: string;
    land: string;
}

const SelectLandskode = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [loading, settLoading] = useState(false);
    const [retningsnumre, settRetningsnumre] = useState([] as Kode[]);
    const [fetchError, settFetchError] = useState<HTTPError | undefined>();

    useEffect(() => {
        if (!loading && !retningsnumre.length) {
            settLoading(true);
            fetchRetningsnumre()
                .then((landskoder) => {
                    settRetningsnumre(landskoder);
                })
                .catch((error: HTTPError) => {
                    settFetchError(error);
                })
                .then(() => {
                    settLoading(false);
                });
        }
    }, [loading, retningsnumre]);

    const mapKoderToOptions = (koder: Kode[]): OptionType[] =>
        koder.map((k) => ({
            label: `${k.land} (${k.landskode})`,
            value: k.landskode,
        }));

    const defineLabel = (option: OptionType, context: FormatOptionLabelMeta<OptionType>) =>
        context.context === 'value' ? `${option.value} ` : `${option.label}`;

    const options = mapKoderToOptions(retningsnumre)
        .sort((a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1))
        .sort((option: OptionType) => (option.value === '+47' ? -1 : 1));

    return (
        <NAVSelect
            id={props.id}
            name={props.name}
            loading={loading}
            label={props.label}
            error={props.error}
            options={options}
            fetchError={fetchError}
            defineLabel={defineLabel}
            option={props.option}
            submitted={props.submitted}
            onChange={props.onChange}
            borderUnderNth={0}
            ref={ref}
        />
    );
});

SelectLandskode.displayName = "SelectLandskode";

export default SelectLandskode;
