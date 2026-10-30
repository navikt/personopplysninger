import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Label, Loader, TextField } from "@navikt/ds-react";
import cls from "classnames";
import { type ForwardedRef, forwardRef, memo, type ReactNode, useEffect } from "react";
import Select, { type ActionMeta, components, type MultiValue, type OptionProps, type SingleValue } from "react-select";
import type { FormatOptionLabelMeta } from "react-select/base";
import type { Language } from "@/language/language";
import { RADIX_DECIMAL } from "@/utils/formattering";
import type { HTTPError } from "../../errorMessage/ErrorMessage";
import { LabelMedHjelpetekst } from "../label-med-hjelpetekst/LabelMedHjelpetekst";
import styles from "./NAVSelect.module.css";
import { text } from "./selectText";

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
    hjelpetekst?: ReactNode;
    openMenuOnClick?: boolean;
    onChange: (value?: OptionType) => void;
    borderUnderNth?: number;
    loading?: boolean;
    defineLabel?: (option: OptionType, context: FormatOptionLabelMeta<OptionType>) => string;
    language: Language;
}

interface OptionType {
    value: string;
    label: string;
}

type OnChangeHandler = (newValue: MultiValue<OptionType> | SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;

const LoadingIndicator = () => <Loader size="xsmall" className={styles.spinner} />;

const DropdownIndicator = () => (
    <div className={styles.dropdownIndicator}>
        <ChevronDownIcon aria-hidden="true" />
    </div>
);
const NAVSelect = forwardRef((props: Props, ref: ForwardedRef<any>) => {
    const labelId = props.id + "_label";
    const controlClasses = cls({
        "KodeverkSelect__control-feil": props.submitted && props.error,
    });

    const value = props.option
        ? props.options
              .filter(
                  (option: OptionType) =>
                      (props.option && option.value === props.option.value) ||
                      (props.option &&
                          option.label.replace(`(${option.value})`, "").toUpperCase().trim() === props.option.label.trim().toUpperCase()),
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
        <div className="skjemaelement KodeverkSelect">
            <div className={styles.header}>
                <LabelMedHjelpetekst
                    label={props.label}
                    hjelpetekst={props.hjelpetekst}
                    labelId={labelId}
                    labelForId={props.id}
                    language={props.language}
                />
            </div>
            <div className="KodeverkSelect--select-wrapper">
                <Select
                    aria-labelledby={labelId}
                    id={props.id}
                    name={props.name}
                    value={value}
                    placeholder={text.sok[props.language]}
                    classNamePrefix="KodeverkSelect"
                    loadingMessage={() => text.laster[props.language]}
                    noOptionsMessage={(v) => `${text.ingenTreff[props.language]} ${v.inputValue}...`}
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
                <Label as="p" role="alert" aria-live="assertive" className={styles.feilmelding}>
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
            placeholder={"+"}
            autoComplete="off"
        />
    );
});

export default memo(NAVSelect);
