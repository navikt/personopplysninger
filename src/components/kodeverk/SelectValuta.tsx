import React, { useEffect, useState } from "react";
import { fetchValutaer } from "../../clients/apiClient";
import { HTTPError } from "../error/Error";
import NAVSelect from "../select/NAVSelect";

interface Props {
  value: string;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value?: string) => void;
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
  const [fetchError, settFetchError] = useState();

  useEffect(() => {
    if (!loading) {
      settLoading(true);
      fetchValutaer()
        .then(v => {
          settValutaer(v);
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

  const mapKoderToOptions = (koder: Valuta[]): any =>
    koder.map(k => ({
      label: `${k.tekst} (${k.kode})`,
      value: k.kode
    }));

  const options = mapKoderToOptions(valutaer).sort(
    (a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1)
  );

  return (
    <NAVSelect
      label={props.label}
      error={props.error}
      options={options}
      fetchError={fetchError}
      value={props.value}
      submitted={props.submitted}
      onChange={props.onChange}
      hjelpetekst={props.hjelpetekst}
    />
  );
};

export default SelectValuta;
