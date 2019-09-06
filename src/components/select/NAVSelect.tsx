import React from "react";
import Select from "react-select";
import NavFrontendSpinner from "nav-frontend-spinner";
import cls from "classnames";
import { NedChevron } from "nav-frontend-chevron";
import { Input } from "nav-frontend-skjema";
import { FormatOptionLabelMeta } from "react-select/base";
import { HjelpetekstHoyre } from "nav-frontend-hjelpetekst";
import { FormattedHTMLMessage } from "react-intl";
import { inString, isValueEqual } from "./utils";

interface Props {
  value: string;
  submitted: boolean;
  label: string;
  options: OptionType[];
  error: string | null;
  fetchError: boolean;
  hjelpetekst?: string;
  onChange: (value?: string) => void;
  borderUnderFirst?: boolean;
  loading?: boolean;
  defineLabel?: (
    option: OptionType,
    context: FormatOptionLabelMeta<OptionType>
  ) => string;
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

  const containerClasses = cls({
    skjemaelement: true,
    KodeverkSelect: true,
    KodeverkSelect__borderUnderFirst: props.borderUnderFirst
  });

  const value = props.value
    ? props.options
        .filter(
          (option: OptionType) =>
            isValueEqual(option.value, props.value) ||
            inString(option.label, props.value)
        )
        .shift()
    : undefined;

  const onChange = (option: OptionType) => {
    if (option && option.value) {
      props.onChange(option.value);
    }
  };

  return !props.fetchError ? (
    <div className={containerClasses}>
      <div className="KodeverkSelect__header">
        {props.label && (
          <div className="skjemaelement__label">{props.label}</div>
        )}
        {props.hjelpetekst && (
          <HjelpetekstHoyre id={"hjelpetekst"}>
            <FormattedHTMLMessage id={props.hjelpetekst} />
          </HjelpetekstHoyre>
        )}
      </div>
      <div className={cls("KodeverkSelect--select-wrapper")}>
        <Select
          value={value}
          label={props.label}
          placeholder="Søk..."
          classNamePrefix="KodeverkSelect"
          loadingMessage={() => "Laster inn..."}
          noOptionsMessage={v => `Ingen treff funnet for ${v.inputValue}...`}
          className={controlClasses}
          isLoading={props.loading}
          options={props.options}
          formatOptionLabel={props.defineLabel}
          onMenuOpen={() => props.onChange(undefined)}
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
      label={props.label}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
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
