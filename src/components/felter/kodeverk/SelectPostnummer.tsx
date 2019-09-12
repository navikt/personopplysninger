import React, { useEffect, useState } from "react";
import { fetchPostnummer } from "../../../clients/apiClient";
import { HTTPError } from "../../error/Error";
import NAVSelect from "../select/NAVSelect";

interface Props {
  option: OptionType;
  submitted: boolean;
  label: string;
  error: string | null;
  onChange: (value?: OptionType) => void;
}

interface OptionType {
  value: string;
  label: string;
}

export interface Kode {
  kode: string;
  tekst: string;
}

const SelectPostnummer = (props: Props) => {
  const [loading, settLoading] = useState(false);
  const [postnummer, settPostnummer] = useState([] as Kode[]);
  const [fetchError, settFetchError] = useState();

  useEffect(() => {
    if (!loading) {
      settLoading(true);
      fetchPostnummer()
        .then(postnummer => {
          settPostnummer(postnummer);
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

  const mapKoderToOptions = (koder: Kode[]): OptionType[] =>
    koder.map(k => ({
      label: `${k.kode} (${k.tekst})`,
      value: k.kode
    }));

  const options = mapKoderToOptions(postnummer).sort(
    (a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1)
  );

  return (
    <NAVSelect
      label={props.label}
      error={props.error}
      options={options}
      fetchError={fetchError}
      option={props.option}
      submitted={props.submitted}
      onChange={props.onChange}
      borderUnderFirst={true}
    />
  );
};

export default SelectPostnummer;
