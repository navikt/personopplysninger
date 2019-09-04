import React, { useEffect, useState } from "react";
import Select from "react-select";
import { ValueType } from "react-select/src/types";
import NavFrontendSpinner from "nav-frontend-spinner";
import cls from "classnames";
import { NedChevron } from "nav-frontend-chevron";
import { fetchRetningsnumre } from "../../clients/apiClient";
import { HTTPError } from "../error/Error";
import { Input } from "nav-frontend-skjema";

interface Props {
  value: string;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value: ValueType<string>) => void;
}

interface OptionType {
  value: string;
  label: string;
}

export interface Kode {
  retningsnummer: string;
  gyldigFra: string;
  gyldigTil: string;
  land: string;
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

const Landskode = (props: Props) => {
  const [loading, settLoading] = useState(false);
  const [retningsnumre, settRetningsnumre] = useState([] as Kode[]);
  const [fetchError, settFetchError] = useState();

  useEffect(() => {
    if (!loading) {
      settLoading(true);
      fetchRetningsnumre()
        .then(landskoder => {
          settRetningsnumre(landskoder);
        })
        .catch((error: HTTPError) => {
          settFetchError(error);
        })
        .then(() => {
          settLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapKoderToOptions = (koder: Kode[]): any =>
    koder.map(k => ({
      label: `${k.land} (${k.retningsnummer})`,
      value: k.retningsnummer
    }));

  const noOptionsMessage = ({ inputValue = "" }) =>
    `Ingen treff funnet for ${inputValue}...`;

  const controlClasses = cls({
    "KodeverkSelect__control-feil": props.submitted && props.error
  });

  return !fetchError ? (
    <div className={"KodeverkSelect skjemaelement"}>
      <label className="skjemaelement__label">{props.label}</label>
      <div className={cls("KodeverkSelect--select-wrapper")}>
        <Select
          label={"Landskode"}
          placeholder="Søk..."
          classNamePrefix="KodeverkSelect"
          loadingMessage={() => "Laster inn..."}
          value={props.value}
          className={controlClasses}
          isLoading={loading}
          options={mapKoderToOptions(retningsnumre)}
          noOptionsMessage={noOptionsMessage}
          components={{ LoadingIndicator, DropdownIndicator }}
          onChange={(option: any) => {
            if (props.value) {
              props.onChange(option.value);
            }
          }}
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

export default Landskode;
