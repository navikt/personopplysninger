import React from "react";
import Select from "react-select";
import NavFrontendSpinner from "nav-frontend-spinner";
import cls from "classnames";
import { NedChevron } from "nav-frontend-chevron";
import { Input } from "nav-frontend-skjema";
import { FormatOptionLabelMeta } from "react-select/base";

interface Props {
  value: string;
  submitted: boolean;
  label: string;
  options: OptionType[];
  error: string | null;
  fetchError: boolean;
  onChange: (value?: string) => void;
  defineLabel: (
    option: OptionType,
    context: FormatOptionLabelMeta<OptionType>
  ) => string;
  loading?: boolean;
}

interface OptionType {
  value: string;
  label: string;
}

const LoadingIndicator = () => (
  <NavFrontendSpinner
    type="XS"
    negativ={true}
    stroke={true}
    className="KodeverkSelect__spinner"
  />
);

const DropdownIndicator = (props: any) => (
  <div className="KodeverkSelect__dropdown-indicator">
    <NedChevron />
  </div>
);

const NAVSelect = (props: Props) => {
  const controlClasses = cls({
    "KodeverkSelect__control-feil": props.submitted && props.error
  });

  const value = props.options
    .filter((option: OptionType) => option.value === props.value)
    .shift();

  const onChange = (option: OptionType) => {
    if (option && option.value) {
      props.onChange(option.value);
    }
  };

  return !props.fetchError ? (
    <div className={"KodeverkSelect skjemaelement"}>
      <label className="skjemaelement__label">{props.label}</label>
      <div className={cls("KodeverkSelect--select-wrapper")}>
        <Select
          label={props.label}
          placeholder="Søk..."
          classNamePrefix="KodeverkSelect"
          formatOptionLabel={props.defineLabel}
          loadingMessage={() => "Laster inn..."}
          value={value}
          className={controlClasses}
          isLoading={props.loading}
          options={props.options}
          onMenuOpen={() => props.onChange(undefined)}
          noOptionsMessage={v => `Ingen treff funnet for ${v}...`}
          components={{ LoadingIndicator, DropdownIndicator }}
          onChange={onChange as any}
        />
      </div>
      {props.submitted && props.error && (
        <div
          role="alert"
          aria-live="assertive"
          className="skjemaelement__feilmelding"
        >
          {props.error}
        </div>
      )}
    </div>
  ) : (
    <Input
      label={"Landskode"}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      bredde={"S"}
      feil={
        props.submitted && props.error
          ? { feilmelding: props.error }
          : undefined
      }
      placeholder={"+"}
    />
  );
};

export default NAVSelect;
