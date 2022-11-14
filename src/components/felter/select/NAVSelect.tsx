import React, { Fragment, useEffect } from "react";
import Select, { components } from "react-select";
import { useIntl } from "react-intl";
import cls from "classnames";
import { FormatOptionLabelMeta } from "react-select/base";
import { FormattedMessage } from "react-intl";
import { OptionProps } from "react-select/src/components/Option";
import { RADIX_DECIMAL } from "utils/formattering";
import { HTTPError } from "../../error/Error";
import { Loader, TextField } from "@navikt/ds-react";
import { CustomHelpText } from "components/customHelpText/CustomHelpText";
import { Expand } from "@navikt/ds-icons";

interface Props {
  id?: string;
  option?: OptionType;
  submitted: boolean;
  label: string;
  htmlSize?: number;
  options: OptionType[];
  error: string | null;
  fetchError?: HTTPError;
  hjelpetekst?: string;
  openMenuOnClick?: boolean;
  onChange: (value?: OptionType) => void;
  borderUnderNth?: number;
  loading?: boolean;
  defineLabel?: (
    option: OptionType,
    context: FormatOptionLabelMeta<OptionType, any>
  ) => string;
}

interface OptionType {
  value: string;
  label: string;
}

const LoadingIndicator = () => (
  <Loader size="xsmall" className="KodeverkSelect__spinner" />
);

const DropdownIndicator = (props: any) => (
  <div className="KodeverkSelect__dropdown-indicator">
    <Expand />
  </div>
);

const NAVSelect = React.memo((props: Props) => {
  const { formatMessage } = useIntl();
  const controlClasses = cls({
    "KodeverkSelect__control-feil": props.submitted && props.error,
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
            (props.option &&
              option.label
                .replace(`(${option.value})`, ``)
                .toUpperCase()
                .trim() === props.option.label.trim().toUpperCase())
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
  const Option = (optionProps: OptionProps<any, any>) => {
    if (props.borderUnderNth) {
      const { innerProps } = optionProps;
      const matches = innerProps.id.match(/\d+$/);
      if (matches) {
        const num = matches[0];
        const id = parseInt(num, RADIX_DECIMAL);
        if (id === props.borderUnderNth) {
          const { className, ...restOptionProps } = optionProps;
          return (
            <components.Option
              className={`${className} KodeverkSelect__option-border`}
              {...restOptionProps}
            />
          );
        }
      }
    }
    return <components.Option {...optionProps} />;
  };

  return !props.fetchError ? (
    <div className={containerClasses}>
      <div className="KodeverkSelect__header">
        {props.label && (
          <div className="skjemaelement__label">{props.label}</div>
        )}
        {props.hjelpetekst && (
          <CustomHelpText placement={"right"}>
            <FormattedMessage
              id={props.hjelpetekst}
              values={{
                b: (text: string) => <b>{text}</b>,
                p: (...chunks: string[]) => (
                  <p>
                    {chunks.map((chunk, i) => (
                      <Fragment key={i}>{chunk}</Fragment>
                    ))}
                  </p>
                ),
              }}
            />
          </CustomHelpText>
        )}
      </div>
      <div className={`${cls("KodeverkSelect--select-wrapper")}`}>
        <Select
          id={props.id}
          value={value}
          label={props.label}
          htmlSize={props.htmlSize}
          placeholder={formatMessage({ id: "select.sok" })}
          classNamePrefix="KodeverkSelect"
          loadingMessage={() => formatMessage({ id: "select.loading" })}
          noOptionsMessage={(v) =>
            `${formatMessage({ id: "select.no.hits" })} ${v.inputValue}...`
          }
          className={controlClasses}
          cacheOptions={true}
          openMenuOnClick={props.openMenuOnClick}
          isLoading={props.loading}
          options={props.options}
          formatOptionLabel={props.defineLabel}
          onMenuOpen={() => props.onChange(undefined)}
          components={{ LoadingIndicator, DropdownIndicator, Option }}
          onChange={onChange as any}
        />
      </div>
      {props.submitted && props.error && (
        <div
          role="alert"
          aria-live="assertive"
          className="skjemaelement__feilmelding typo-feilmelding"
        >
          {props.error}
        </div>
      )}
    </div>
  ) : (
    <TextField
      label={props.label}
      value={props.option && props.option.value}
      htmlSize={props.htmlSize}
      onChange={(e) =>
        props.onChange({ label: props.label, value: e.target.value })
      }
      error={props.submitted && props.error}
      placeholder={"+"}
    />
  );
});

export default NAVSelect;
