import { ForwardedRef, useEffect, forwardRef, memo } from 'react';
import Select, { ActionMeta, components, MultiValue, OptionProps, SingleValue } from 'react-select';
import { useIntl } from 'react-intl';
import cls from 'classnames';
import { FormatOptionLabelMeta } from 'react-select/base';
import { RADIX_DECIMAL } from 'utils/formattering';
import { HTTPError } from '../../error/Error';
import { Label, Loader, TextField } from '@navikt/ds-react';
import { Expand } from '@navikt/ds-icons';
import { LabelMedHjelpetekst } from '../label-med-hjelpetekst/LabelMedHjelpetekst';

interface Props {
    id: string;
    name: string;
    option?: OptionType;
    submitted: boolean;
    label: string;
    htmlSize?: number;
    options: OptionType[];
    error?: string | null;
    fetchError?: HTTPError;
    hjelpetekst?: string;
    openMenuOnClick?: boolean;
    onChange: (value?: OptionType) => void;
    borderUnderNth?: number;
    loading?: boolean;
    defineLabel?: (option: OptionType, context: FormatOptionLabelMeta<OptionType>) => string;
}

interface OptionType {
    value: string;
    label: string;
}

type OnChangeHandler = (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;

const LoadingIndicator = () => <Loader size="xsmall" className="KodeverkSelect__spinner" />;

const DropdownIndicator = () => (
    <div className="KodeverkSelect__dropdown-indicator">
        <Expand />
    </div>
);
/* eslint-disable-next-line*/
const NAVSelect = forwardRef((props: Props, ref: ForwardedRef<any>) => {
    const labelId = props.id + '_label';

    const { formatMessage } = useIntl();
    const controlClasses = cls({
        'KodeverkSelect__control-feil': props.submitted && props.error,
    });

    const containerClasses = cls({
        skjemaelement: true,
        KodeverkSelect: true,
    });

    const value = props.option
        ? props.options
              .filter(
                  (option: OptionType) =>
                      // Find closest match
                      (props.option && option.value === props.option.value) ||
                      (props.option && option.label.replace(`(${option.value})`, '').toUpperCase().trim() === props.option.label.trim().toUpperCase())
              )
              .shift()
        : null;

    useEffect(() => {
        if (value && props.option && value.value !== props.option.value) {
            props.onChange(value);
        }
    }, [props, value]);

    const onChange = (option: OptionType) => {
        if (option) {
            props.onChange(option);
        }
    };

    // Legg til border på option
    // TODO: Forenkling
    const Option = (optionProps: OptionProps<OptionType, boolean>) => {
        if (props.borderUnderNth) {
            const { innerProps } = optionProps;
            const matches = innerProps?.id?.match(/\d+$/);

            if (matches) {
                const num = matches[0];
                const id = parseInt(num, RADIX_DECIMAL);
                if (id === props.borderUnderNth) {
                    const { className, ...restOptionProps } = optionProps;
                    return <components.Option className={`${className} KodeverkSelect__option-border`} {...restOptionProps} />;
                }
            }
        }
        return <components.Option {...optionProps} />;
    };

    return !props.fetchError ? (
        <div className={containerClasses}>
            <div className="KodeverkSelect__header">
                <LabelMedHjelpetekst label={props.label} hjelpetekst={props.hjelpetekst} labelId={labelId} labelForId={props.id} />
            </div>
            <div className={`${cls('KodeverkSelect--select-wrapper')}`}>
                <Select
                    aria-labelledby={labelId}
                    id={props.id}
                    name={props.name}
                    value={value}
                    placeholder={formatMessage({ id: 'select.sok' })}
                    classNamePrefix="KodeverkSelect"
                    loadingMessage={() => formatMessage({ id: 'select.loading' })}
                    noOptionsMessage={(v) => `${formatMessage({ id: 'select.no.hits' })} ${v.inputValue}...`}
                    className={controlClasses}
                    openMenuOnClick={props.openMenuOnClick}
                    isLoading={props.loading}
                    options={props.options}
                    formatOptionLabel={props.defineLabel}
                    onMenuOpen={() => props.onChange(undefined)}
                    components={{ LoadingIndicator, DropdownIndicator, Option }}
                    onChange={onChange as OnChangeHandler}
                    ref={ref}
                />
            </div>
            {props.submitted && props.error && (
                <Label as="p" role="alert" aria-live="assertive" className="KodeverkSelect__feilmelding">
                    {props.error}
                </Label>
            )}
        </div>
    ) : (
        <TextField
            label={props.label}
            value={props.option && props.option.value}
            htmlSize={props.htmlSize}
            onChange={(e) => props.onChange({ label: props.label, value: e.target.value })}
            error={props.submitted && props.error}
            placeholder={'+'}
        />
    );
});

export default memo(NAVSelect);
