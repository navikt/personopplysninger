import React, { useEffect, useState } from "react";
import { fetchLand } from "clients/apiClient";
import { HTTPError } from "components/error/Error";
import NAVSelect from "components/felter/select/NAVSelect";

interface Props {
  option?: OptionType;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value?: OptionType) => void;
  hjelpetekst?: string;
}

interface OptionType {
  value: string;
  label: string;
}

export interface Land {
  kode: string;
  tekst: string;
}

const SelectLand = (props: Props) => {
  const [loading, settLoading] = useState(false);
  const [land, settLand] = useState([] as Land[]);
  const [fetchError, settFetchError] = useState<HTTPError | undefined>();

  useEffect(() => {
    if (!loading && !land.length) {
      settLoading(true);
      fetchLand()
        .then((v) => {
          settLand(v);
        })
        .catch((error: HTTPError) => {
          settFetchError(error);
        })
        .then(() => {
          settLoading(false);
        });
    }
  }, [loading, land]);

  const mapKoderToOptions = (koder: Land[]): any =>
    koder.map((k) => ({
      label: k.tekst,
      value: k.kode,
    }));

  const options = mapKoderToOptions(land)
    .filter((option: OptionType) => option.value !== "NOR")
    .filter((option: OptionType) => option.label !== "UOPPGITT/UKJENT")
    .sort((a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1));

  return (
    <NAVSelect
      loading={loading}
      label={props.label}
      error={props.error}
      options={options}
      fetchError={fetchError}
      option={props.option}
      submitted={props.submitted}
      onChange={props.onChange}
      hjelpetekst={props.hjelpetekst}
    />
  );
};

export default SelectLand;
