import React, { useEffect } from "react";
import Select from "react-select";
import NavFrontendSpinner from "nav-frontend-spinner";
import cls from "classnames";
import { NedChevron } from "nav-frontend-chevron";
import { Input } from "nav-frontend-skjema";
import { FormatOptionLabelMeta } from "react-select/base";
import { HjelpetekstHoyre } from "nav-frontend-hjelpetekst";
import { FormattedHTMLMessage } from "react-intl";
import { inString } from "./utils";

interface Props {
  option: OptionType;
  submitted: boolean;
  label: string;
  options: OptionType[];
  error: string | null;
  fetchError: boolean;
  hjelpetekst?: string;
  openMenuOnClick?: boolean;
  onChange: (value?: OptionType) => void;
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

const NAVSelect = React.memo((props: Props) => {
  const controlClasses = cls({
    "KodeverkSelect__control-feil": props.submitted && props.error
  });

  const containerClasses = cls({
    skjemaelement: true,
    KodeverkSelect: true,
    KodeverkSelect__borderUnderFirst: props.borderUnderFirst
  });

  const value = props.option
    ? props.options
        .filter(
          (option: OptionType) =>
            inString(option.label, props.option.value) ||
            inString(option.label, props.option.label) ||
            inString(option.value, props.option.value) ||
            inString(option.value, props.option.label)
        )
        .shift()
    : null;

  useEffect(() => {
    if (value && value.value !== props.option.value) {
      props.onChange(value);
    }
  }, [props, value]);

  const onChange = (option: OptionType) => {
    if (option) {
      props.onChange(option);
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
          cacheOptions={true}
          openMenuOnClick={props.openMenuOnClick}
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
      value={props.option.value}
      onChange={e =>
        props.onChange({ label: props.label, value: e.target.value })
      }
      feil={
        props.submitted && props.error
          ? { feilmelding: props.error }
          : undefined
      }
      placeholder={"+"}
    />
  );
});

export default NAVSelect;
