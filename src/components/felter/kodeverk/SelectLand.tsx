import React, { useEffect, useState } from "react";
import { fetchLand } from "../../../clients/apiClient";
import { HTTPError } from "../../error/Error";
import NAVSelect from "../select/NAVSelect";

interface Props {
  option: OptionType;
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
  const [valutaer, settValutaer] = useState([] as Land[]);
  const [fetchError, settFetchError] = useState();

  useEffect(() => {
    let didCancel = false;
    if (!loading) {
      settLoading(true);
      fetchLand()
        .then(v => {
          if (!didCancel) {
            settValutaer(v);
          }
        })
        .catch((error: HTTPError) => {
          if (!didCancel) {
            settFetchError(error);
          }
        })
        .then(() => {
          if (!didCancel) {
            settLoading(false);
          }
        });
    }
    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapKoderToOptions = (koder: Land[]): any =>
    koder.map(k => ({
      label: k.tekst,
      value: k.kode
    }));

  const options = mapKoderToOptions(valutaer)
    .filter((option: OptionType) => option.value !== "NOR")
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
