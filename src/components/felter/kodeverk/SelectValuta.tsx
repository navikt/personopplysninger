import React, { useEffect, useState } from "react";
import { fetchValutaer } from "clients/apiClient";
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

export interface Valuta {
  kode: string;
  tekst: string;
}

const SelectValuta = (props: Props) => {
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

  const mapKoderToOptions = (koder: Valuta[]): any =>
    koder.map((k) => ({
      label: `${k.tekst} (${k.kode})`,
      value: k.kode,
    }));

  const options = mapKoderToOptions(valutaer)
    .sort((a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1))
    .sort((a: OptionType) => (a.value === "SEK" ? -1 : 1))
    .sort((a: OptionType) => (a.value === "EUR" ? -1 : 1))
    .sort((a: OptionType) => (a.value === "USD" ? -1 : 1));

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
      borderUnderNth={2}
    />
  );
};

export default SelectValuta;
