import React, { ForwardedRef, useEffect, useState } from "react";
import { fetchLand } from "clients/apiClient";
import { HTTPError } from "components/error/Error";
import NAVSelect from "components/felter/select/NAVSelect";

interface Props {
  option?: OptionType;
  submitted: boolean;
  label: string;
  error?: string;
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
  kreverIban: boolean;
  ibanLengde?: number;
  kreverBankkode: boolean;
  bankkodeLengde?: number;
  alternativLandkode?: string;
}

const SelectLand = React.forwardRef((props: Props, ref: ForwardedRef<any>) => {
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
      kreverIban: k.kreverIban,
      ibanLengde: k.ibanLengde,
      kreverBankkode: k.kreverBankkode,
      bankkodeLengde: k.bankkodeLengde,
      alternativLandkode: k.alternativLandkode,
    }));

  const disallowedCountries = ["NORGE", "UOPPGITT/UKJENT", "UOPPGITT"];

  const options = mapKoderToOptions(land)
    .filter(
      (option: OptionType) =>
        !disallowedCountries.includes(option.label.toUpperCase())
    )
    .sort((a: OptionType, b: OptionType) => (a.label < b.label ? -1 : 1));

  return (
    <NAVSelect
      id={"land"}
      loading={loading}
      label={props.label}
      error={props.error}
      options={options}
      fetchError={fetchError}
      option={props.option}
      submitted={props.submitted}
      onChange={props.onChange}
      hjelpetekst={props.hjelpetekst}
      htmlSize={30}
      ref={ref}
    />
  );
});

export default SelectLand;
